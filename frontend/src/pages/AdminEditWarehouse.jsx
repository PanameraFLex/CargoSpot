import { useParams } from "react-router-dom";
import WarehouseForm from "../components/WarehouseForm";


export default function AdminEditWarehouse() {
const { id } = useParams();


return (
<div className="p-8">
<h1 className="text-3xl font-bold mb-6">Edit Warehouse</h1>
<WarehouseForm mode="edit" warehouseId={id} />
</div>
);
}