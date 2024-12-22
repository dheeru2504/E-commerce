import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";

const BulkUpload = () => {
    const [file, setFile] = useState(null);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle bulk upload
    const handleBulkUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please select a Excel file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); // Append the CSV file to formData

        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/product/bulk-create-product`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data?.success) {
                toast.success(`${data.message}`);
            } else {
                toast.error(data?.message || "Failed to upload products.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <Layout title={"Bulk Upload Products"}>
            <div className="container-fluid p-4 m-3">
                <div className="row">
                    <div className="col-md-3 p-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="font-type">Bulk Upload Products</h1>
                        <div className="m-1 w-75">
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {file ? file.name : "Upload Excel File"}
                                    <input
                                        type="file"
                                        name="file"
                                        accept=".csv"
                                        onChange={handleFileChange}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                <button
                                    className="btn btn-outline-info"
                                    onClick={handleBulkUpload}
                                >
                                    UPLOAD PRODUCTS
                                </button>
                            </div>
                            <div>
                                <p className="text-muted">
                                    Make sure your Excel file includes the following headers:
                                </p>
                                <pre>
                                    name,slug,description,price,SKU,category,quantity,shipping
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BulkUpload;
