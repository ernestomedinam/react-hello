import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	// ["do the dishes", "walk the dog", "walk the dog"]
	// [{id: "someid", done: false, label: "do the dishes"}]
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	async function getTasks() {
		// fetch from api
		try {
			const response = await fetch(
				"https://playground.4geeks.com/apis/fake/todos/user/miami-61"
			);
			const body = await response.json();
			setTasks(body);
		} catch(error) {
			alert(error);
		}
	};
	function addTaskToApi() {
		// fetch to api using PUT and the new array of tasks
		const newTaskObject = {
			done: false,
			label: newTask
		}
		const updatedTasks = [
			...tasks,
			newTaskObject
		]
		fetch(
			"https://playground.4geeks.com/apis/fake/todos/user/miami-61", {
				method: "PUT",
				body: JSON.stringify(updatedTasks),
				headers: {
					"Content-Type": "application/json"
				}
		})
			.then((response) => {
				if (response.ok) {
					// if successfull, i want to GET tasks
					getTasks();
				}
			})
			.catch((error) => alert(error));
	}
	useEffect(() => {
		getTasks();
	}, []);
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Hello Rigo!</h1>
			<ul>
				{tasks.map((task) => (
					<li key={task.id}>
						{task.label}
					</li>
				))}
			</ul>
			<input type="text" value={newTask} onChange={(event) => setNewTask(event.target.value)} />
			<button 
				className="btn btn-primary"
				onClick={addTaskToApi}>
				Add task
			</button>
		</div>
	);
};

export default Home;
