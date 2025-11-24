import WarehouseForm from "../components/WarehouseForm";


export default function AdminAddWarehouse() {
return (
<div className="p-8">
<h1 className="text-3xl font-bold mb-6">Add New Warehouse</h1>
<WarehouseForm mode="add" />
</div>
);
}