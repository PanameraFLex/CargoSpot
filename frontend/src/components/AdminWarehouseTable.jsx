import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function AdminWarehouseTable() {
const [warehouses, setWarehouses] = useState([]);


useEffect(() => {
axios.get("/api/warehouses").then((res) => setWarehouses(res.data));
}, []);


return (
<table className="w-full border-collapse border border-gray-400">
<thead>
<tr className="bg-gray-200">
<th className="border p-2">Name</th>
<th className="border p-2">Location</th>
<th className="border p-2">Manager</th>
<th className="border p-2">Capacity</th>
<th className="border p-2">Actions</th>
</tr>
</thead>
<tbody>
{warehouses.map((wh) => (
<tr key={wh._id}>
<td className="border p-2">{wh.name}</td>
<td className="border p-2">{wh.location}</td>
<td className="border p-2">{wh.manager}</td>
<td className="border p-2">{wh.capacity}</td>
<td className="border p-2 flex gap-2">
<Link
to={`/admin/edit/${wh._id}`}
className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
>
Edit
</Link>
</td>
</tr>
))}
</tbody>
</table>
);
}