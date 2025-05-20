import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios"

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "total",
    headerName: "Total Amount",
    width: 250,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Status",
    width: 300,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 400,
    headerAlign: "center",
    align: "center",
  },
];

const rows = [
  {
    id: "1",
    total: 500,
    status: "Completed",
    created_at: "2024-04-01 10:00 AM",
  },
  {
    id: "2",
    total: 1200,
    status: "Pending",
    created_at: "2024-04-01 12:30 PM",
  },
  { id: 3, total: 750, status: "Cancelled", created_at: "2024-03-30 03:45 PM" },
  { id: 4, total: 1800, status: "Shipped", created_at: "2024-03-29 09:15 AM" },
  { id: 5, total: 990, status: "Completed", created_at: "2024-03-28 07:20 PM" },
  { id: 6, total: 1300, status: "Pending", created_at: "2024-03-27 02:50 PM" },
  { id: 7, total: 450, status: "Completed", created_at: "2024-03-26 11:10 AM" },
  { id: 8, total: 1700, status: "Shipped", created_at: "2024-03-25 04:40 PM" },
  { id: 9, total: 620, status: "Cancelled", created_at: "2024-03-24 01:30 PM" },
  {
    id: 10,
    total: 890,
    status: "Completed",
    created_at: "2024-03-23 06:55 PM",
  },
  {
    id: 11,
    total: 890,
    status: "Completed",
    created_at: "2024-03-23 06:55 PM",
  },
  {
    id: 12,
    total: 890,
    status: "Completed",
    created_at: "2024-03-23 06:55 PM",
  },
];

const paginationModel = { page: 0, pageSize: 10 };

// Main Admin Orders Component
const AdminCustomers = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);



  

  return (
    <div>
      <h1 className="font-[inter] text-3xl mb-6 ">Customers</h1>
      <Paper sx={{ height: "90%", width: "400" }}>
        <DataGrid
          rows={rows}
          rowHeight={47}
          columns={columns.map((col) => ({
            ...col,
            headerClassName: "custom-header",
            align: "center",
            textAlign: "center",
          }))}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 0,
            "& .custom-header": {
              fontWeight: "bold",
              opacity: 0.7,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent",
            },
            "& .MuiDataGrid-cell": {
              textAlign: "center",
            },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              border: "none !important",
            },
            "& .MuiDataGrid-cell.selected": {
              border: "none",
              outline: "none",
            },
            "& .Mui-selected": {
              backgroundColor: "transparent !important", // Remove row highlight when clicked (selected)
              "&:hover": {
                backgroundColor: "transparent !important", // Prevent highlighting when hovered
              },
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default AdminCustomers;
