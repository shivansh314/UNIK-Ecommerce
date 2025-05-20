import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import OrderModal from "./OrderModal.jsx";
import { fetchOrders } from "../../store/OrderSlice.js";
import { useDispatch, useSelector } from "react-redux";



const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "total_amount",
    headerName: "Total",
    width: 250,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "payment_status",
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

const paginationModel = { page: 0, pageSize: 10 };

// Main Admin Orders Component
const AdminOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchOrders());
    }, [dispatch]);
    const rows = useSelector((state) => state.order.items);


  return (
    <div>
      <OrderModal isOpen={isOpen} setIsOpen={setIsOpen} order_id = {selectedOrder} />
      <h1 className="font-[inter] text-3xl mb-6 "> Orders</h1>
      <Paper sx={{ height: "90%", width: "100%" }}>
        <DataGrid
          rows={rows}
          rowHeight={47}
          columns={columns.map((col) => ({
            ...col,
            headerClassName: "custom-header",
            align: "center",
            textAlign: "center",
          }))}
          onRowClick={(params) => {
            setSelectedOrder(params.row.id);
            setIsOpen(true);
          }}
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

export default AdminOrders;
