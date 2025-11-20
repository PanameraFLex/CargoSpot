export default function SearchBar({ filters, setFilters }) {
  function handleChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6 grid gap-4 md:grid-cols-4">
      <input
        type="text"
        name="search"
        placeholder="Search by name..."
        value={filters.search}
        onChange={handleChange}
        className="px-3 py-2 border rounded"
      />

      <input
        type="text"
        name="manager"
        placeholder="Filter by manager..."
        value={filters.manager}
        onChange={handleChange}
        className="px-3 py-2 border rounded"
      />

      <input
        type="number"
        name="capacity"
        placeholder="Min capacity..."
        value={filters.capacity}
        onChange={handleChange}
        className="px-3 py-2 border rounded"
      />

      <input
        type="text"
        name="category"
        placeholder="Inventory category..."
        value={filters.category}
        onChange={handleChange}
        className="px-3 py-2 border rounded"
      />
    </div>
  );
}
