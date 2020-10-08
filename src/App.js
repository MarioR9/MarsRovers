import React from 'react';
import './App.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import CreateRovers from './components/createRovers.js';
import Graph from './components/graph.js';

let finalCoordinates = [];
let dataMovm = [];
let result = {};

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gridX: !'',
			gridY: '',
			gridZ: '',
			roverMoves: '',
			deployedRovers: [],
			start: false,
			disabled: false,
			deployUnits: false,
			data: [],
			boundX: '',
			boundY: '',
			bounds: []
		};
	}
	handleClearBtn = () => {
		this.setState({ clearBtn: true });
	};
	handleShowBtn = () => {
		this.setState({ show: false });
	};
	handleCollectBtn = () => {
		this.setState({ bounds: { x: this.state.boundX, y: this.state.boundY } });
	};
	handleMovementsInput = (e) => {
		//regex to make sure input only captures corrent directions. it will only store L , M or R.
		const checkForLorM = /[^l^m^r]/gi;
		let moves = e.currentTarget.value.replace(checkForLorM, '');
		this.setState({ roverMoves: moves.toUpperCase() });
	};
	handleRovers = () => {
		//handler will create instaces of the desired amount of rovers and push them into and array.
		if (this.state.data.length === 0) {
			let rovers = [];
			dataMovm = [];
			rovers.push(1);
			this.setState({ deployedRovers: rovers });
		} else {
			this.setState({ data: [] });
			dataMovm.length = 0;
		}
	};

	handleRoverLocationX = (e) => {
		let input = e.currentTarget.value.split('');
		this.setState({ gridX: input[0], gridY: input[1], gridZ: input[2] });
	};
	handleInfoLoading = () => {
		//resets data array and also sets new data for rovers.
		dataMovm.length = 0;
		this.setState({ data: [] });
		dataMovm.push({
			x: parseInt(this.state.gridX),
			y: parseInt(this.state.gridY),
			mvm: this.state.roverMoves,
			z: this.state.gridZ
		});
		this.setState({ data: dataMovm });
	};

	handleVisual = () => {
		//resets the array of results and clears the visual.
		finalCoordinates.length = 0;
		this.setState({ data: [] });
	};

	moveForward = (direction) => {
		switch (direction.heading) {
			case 'N':
				direction.y++;
				result = { x: direction.x, y: direction.y, heading: direction.heading };
				break;
			case 'S':
				direction.y--;
				result = { x: direction.x, y: direction.y, heading: direction.heading };
				break;
			default:
			case 'W':
				direction.x--;
				result = { x: direction.x, y: direction.y, heading: direction.heading };
				break;
			case 'E':
				direction.x++;
				result = { x: direction.x, y: direction.y, heading: direction.heading };
				break;
		}
	};

	turnLeft = (direction) => {
		switch (direction.heading) {
			case 'N':
				direction.heading = 'W';
				result = { x: direction.x, y: direction.y, heading: direction.heading };
				break;
			case 'S':
				direction.heading = 'E';
				result = { x: direction.x, y: direction.y, heading: direction.heading };
				break;
			default:
			case 'W':
				direction.heading = 'S';
				result = { x: direction.x, y: direction.y, heading: direction.headingt };
				break;
			case 'E':
				direction.heading = 'N';
				result = { x: direction.x, y: direction.y, heading: direction.heading };
				break;
		}
	};

	turnRight = (direction) => {
		switch (direction.heading) {
			case 'N':
				direction.heading = 'E';
				result = { x: direction.x, y: direction.y, heading: direction.heading };
				break;
			case 'S':
				direction.heading = 'W';
				result = { x: direction.x, y: direction.y, heading: direction.heading };
				break;
			default:
			case 'W':
				direction.heading = 'N';
				result = { x: direction.x, y: direction.y, heading: direction.heading };
				break;
			case 'E':
				direction.heading = 'S';
				result = { x: direction.x, y: direction.y, heading: direction.heading };
				break;
		}
	};

	handleRoverMovment = () => {
		this.setState({ data: [] });
		let direction = {
			x: this.state.gridX,
			y: this.state.gridY,
			movement: this.state.roverMoves,
			heading: this.state.gridZ.toUpperCase()
		};
		this.move(direction);
	};

	move = (direction) => {
		let movements = direction.movement.split('');
		for (let i = 0; i < movements.length; i++) {
			switch (direction.movement[i]) {
				case 'L':
					this.turnLeft(direction);
					break;
				case 'R':
					this.turnRight(direction);
					break;
				default:
				case 'M':
					this.moveForward(direction);
					break;
			}
		}
		finalCoordinates.push({
			data: [
				[ 'x', `Heading: ${result.heading}` ],
				[ parseInt(this.state.gridX), parseInt(this.state.gridY) ],
				[ result.x, result.y ]
			]
		});
	};

	render() {
		return (
			<div className="App">
				<div className="input-location">
					<div>
						<InputGroup className="mb-2">
							<InputGroup.Prepend>
								<InputGroup.Text id="basic-addon1">Exploration grid bounds</InputGroup.Text>
								<FormControl
									className="input-group"
									onChange={(e) => {
										this.setState({ boundX: e.currentTarget.value });
									}}
								/>
								<FormControl
									className="input-group"
									onChange={(e) => {
										this.setState({ boundY: e.currentTarget.value });
									}}
								/>
								<Button
									variant="outline-info"
									onClick={this.handleCollectBtn}
									disabled={this.state.disabled}
								>
									Set
								</Button>
							</InputGroup.Prepend>
							<br />
							<Button onClick={this.handleRovers} disabled={this.state.disabled} variant="outline-info">
								Build Rover
							</Button>
						</InputGroup>
					</div>

					{this.state.deployedRovers.map((rover) => (
						<CreateRovers
							rover={rover}
							key={rover}
							handleRoverLocationZ={this.handleRoverLocationZ}
							handleRoverLocationY={this.handleRoverLocationY}
							handleRoverLocationX={this.handleRoverLocationX}
							handleMovementsInput={this.handleMovementsInput}
							handleInfoLoading={this.handleInfoLoading}
							handleRoverMovment={this.handleRoverMovment}
							handleVisual={this.handleVisual}
							show={this.state.show}
							closeShow={this.state.handleShowBtn}
						/>
					))}
				</div>

				<div>
					{finalCoordinates.map((data) => (
						<Graph key={data} bounds={this.state.bounds} handleClearBtn={this.handleClearBtn} data={data} />
					))}
				</div>
			</div>
		);
	}
}
