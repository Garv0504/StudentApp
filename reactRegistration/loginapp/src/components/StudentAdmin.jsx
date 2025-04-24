import React, { useState } from "react";

const StudentAdmin = () => {
	const [data, setData] = useState([]);
	const showData = async (event) => {
		event.preventDefault();
		const sid = event.target.sid.value;
		if (sid == "*") {
			const data = await fetch("http://localhost:3000/admin/data");
			const res = await data.json();
            console.log(res)
			setData(res);
            // console.log(data);
		} else {
			const data = await fetch(
				`http://localhost:3000/admin/showByEmail/${sid}`
			);
			const res = await data.json();
			console.log(res.msg);
			setData(Array.isArray(res.msg) ? res.msg : [res.msg]);
		}
	};

	const handleDelete = async (email) => {
		alert("Are you sure to delete the Student");
		const data = await fetch(
			`http://localhost:3000/admin/deleteByEmail/${email}`,
			{
				method: "delete",
			}
		);
		const res = await data.json();
		alert(res.msg);
	};

	const handleUpdate = async (email) => {
		const newName = prompt("Enter new Name");
		const newPass = prompt("Enter new Password");
		if (!newName && !newPass) return;
		const data = await fetch(
			`http://localhost:3000/admin/updateByEmail/${email}`,
			{
				method: "PATCH",
				body: JSON.stringify({ name: newName, password: newPass }),
				headers: { "content-type": "application/json" },
			}
		);
		const res = await data.json();
		alert(res.msg);
	};

	return (
		<>
			<div>Student Data</div>
			<form onSubmit={showData}>
				<div>
					<input type="text" name="sid" placeholder="Enter * or sid" />
				</div>
				<div>
					<button type="submit">Search Student</button>
				</div>
				{data && data.length > 0 ? (
					<table border="2" cellPadding="5">
						<thead>
							<tr>
								<td>Name</td>
								<td>Email</td>
							</tr>
						</thead>

						<tbody>
							{data.map((student) => (
								<tr key={student.email}>
									<td>{student.name}</td>
									<td>{student.email}</td>
									<td>
										<button onClick={() => handleDelete(student.email)}>
											Delete
										</button>
									</td>
									<td>
										<button onClick={() => handleUpdate(student.email)}>
											Update
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div>No Data Found</div>
				)}
			</form>
		</>
	);
};

export default StudentAdmin;
