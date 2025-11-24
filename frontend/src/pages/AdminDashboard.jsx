import AdminWarehouseTable from "../components/AdminWarehouseTable";
import { Link } from "react-router-dom";


export default function AdminDashboard() {
return (
<div className="p-8">
<div className="flex justify-between items-center mb-6">
<h1 className="text-3xl font-bold">Admin Dashboard</h1>
<Link
to="/admin/add"
className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
+ Add Warehouse
</Link>
</div>
<AdminWarehouseTable />
</div>
);
}