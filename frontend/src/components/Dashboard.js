import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

function Dashboard() {

  const userInfo =
    JSON.parse(localStorage.getItem('userInfo'));

  const [issues, setIssues] = useState([]);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    priority: 'Medium',
    status: 'Open',
    assignedTo: '',
    dueDate: ''
  });

  const API_URL =
    'https://auditissueagingtracker-1.onrender.com/api/issues';

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {

    try {

      const response = await axios.get(API_URL);

      setIssues(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await axios.put(
          `${API_URL}/${editId}`,
          formData
        );

        alert('Issue Updated Successfully');

      } else {

        await axios.post(
          API_URL,
          formData
        );

        alert('Issue Added Successfully');

      }

      fetchIssues();

      setFormData({
        title: '',
        description: '',
        department: '',
        priority: 'Medium',
        status: 'Open',
        assignedTo: '',
        dueDate: ''
      });

      setEditId(null);

    } catch (error) {

      console.log(error);

    }
  };

  const deleteIssue = async (id) => {

    try {

      await axios.delete(
        `${API_URL}/${id}`
      );

      fetchIssues();

    } catch (error) {

      console.log(error);

    }
  };

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `${API_URL}/${id}`,
        { status }
      );

      fetchIssues();

    } catch (error) {

      console.log(error);

    }
  };

  const editIssue = (issue) => {

    setEditId(issue._id);

    setFormData({
      title: issue.title,
      description: issue.description,
      department: issue.department,
      priority: issue.priority,
      status: issue.status,
      assignedTo: issue.assignedTo,
      dueDate: issue.dueDate
        ? issue.dueDate.substring(0, 10)
        : ''
    });

  };

  const logoutHandler = () => {

    localStorage.removeItem('userInfo');

    window.location.href = '/login';

  };

  if (!userInfo) {

    return <Navigate to="/login" />;

  }

  const priorityData = [
    {
      name: 'High',
      value: issues.filter(
        (issue) => issue.priority === 'High'
      ).length
    },

    {
      name: 'Medium',
      value: issues.filter(
        (issue) => issue.priority === 'Medium'
      ).length
    },

    {
      name: 'Low',
      value: issues.filter(
        (issue) => issue.priority === 'Low'
      ).length
    }
  ];

  const statusData = [
    {
      name: 'Open',
      count: issues.filter(
        (issue) => issue.status === 'Open'
      ).length
    },

    {
      name: 'In Progress',
      count: issues.filter(
        (issue) => issue.status === 'In Progress'
      ).length
    },

    {
      name: 'Closed',
      count: issues.filter(
        (issue) => issue.status === 'Closed'
      ).length
    }
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#22c55e'];

  return (

    <div className="container">

      <h1 className="heading">
        Audit Issue Aging Tracker
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >

        <h2>
          Welcome {userInfo.name}
        </h2>

        <button
          onClick={logoutHandler}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>

      </div>

      <div className="dashboard-cards">

        <div className="card">
          <h2>{issues.length}</h2>
          <p>Total Issues</p>
        </div>

        <div className="card">
          <h2>
            {
              issues.filter(
                (issue) => issue.status === 'Open'
              ).length
            }
          </h2>
          <p>Open Issues</p>
        </div>

        <div className="card">
          <h2>
            {
              issues.filter(
                (issue) => issue.priority === 'High'
              ).length
            }
          </h2>
          <p>High Priority</p>
        </div>

      </div>

      <div className="form-container">

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Issue Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={formData.assignedTo}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <button type="submit">

            {
              editId
                ? 'Update Issue'
                : 'Add Issue'
            }

          </button>

        </form>

      </div>

      <div
        style={{
          display: 'flex',
          gap: '30px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}
      >

        <div className="card">

          <h3>Priority Analytics</h3>

          <PieChart width={350} height={300}>

            <Pie
              data={priorityData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >

              {
                priorityData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[index %
                        COLORS.length]
                      }
                    />

                  )
                )
              }

            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>

        </div>

        <div className="card">

          <h3>Status Analytics</h3>

          <BarChart
            width={400}
            height={300}
            data={statusData}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="count"
              fill="#2563eb"
            />

          </BarChart>

        </div>

      </div>

      <div className="card">

        <h2>Issue List</h2>

        <table
          border="1"
          width="100%"
          cellPadding="10"
          style={{
            marginTop: '20px',
            borderCollapse: 'collapse'
          }}
        >

          <thead>

            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Department</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {
              issues.map((issue) => (

                <tr key={issue._id}>

                  <td>{issue.title}</td>

                  <td>{issue.description}</td>

                  <td>{issue.department}</td>

                  <td>{issue.priority}</td>

                  <td>

                    <select
                      value={issue.status}
                      onChange={(e) =>
                        updateStatus(
                          issue._id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Open">
                        Open
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Closed">
                        Closed
                      </option>

                    </select>

                  </td>

                  <td>{issue.assignedTo}</td>

                  <td>
                    {
                      issue.dueDate
                        ? issue.dueDate.substring(0, 10)
                        : ''
                    }
                  </td>

                  <td>

                    <button
                      onClick={() => editIssue(issue)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteIssue(issue._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;