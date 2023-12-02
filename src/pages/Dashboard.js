import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import "./Login.css";
const customCSS = `
  .recharts-x-axis-tick .recharts-text {
    color: green;
  }
`;
// const token = sessionStorage.getItem("token");

const Dashboard = () => {
  const [getData, setGetData] = useState({
    charge_customers: false,
    amount: {
      category_6: "",
      category_7: "",
      category_8: "",
      category_9: "",
      category_10: "",
    },
    name: "",
    location: "",
  });
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const data = [
    {
      name: "Custom",
      value: getData.amount.category_6,
    },
    {
      name: "Category 1",
      value: getData.amount.category_7,
    },
    {
      name: "Category 2",
      value: getData.amount.category_8,
    },
    {
      name: "Category 3",
      value: getData.amount.category_9,
    },
    {
      name: "Category 4",
      value: getData.amount.category_10,
    },
  ];

  const handleGet = async () => {
    try {
      const url = " https://stg.dhunjam.in/account/admin/4";
      const response = await fetch(url);
      const data = await response.json();

      const { charge_customers, amount, name, location } = data.data;

      setGetData({
        charge_customers,
        amount,
        name,
        location,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const url = "https://stg.dhunjam.in/account/admin/4";
      const updatedData = {
        amount: {
          category_6: getData.amount.category_6,
        },
      };
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      setLoading(false);
      console.log(data);
      setChange(!change);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    handleGet();
  }, [change]);

  return (
    <div className="dashboard-container">
      <p className="login-heading">{`${getData?.name},${getData?.location} on Dhun Jam`}</p>
      {/* inputs container */}
      <div
        style={{
          width: "38rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {/* container1 */}
        <div
          style={{
            // width: "25rem",
            display: "flex",
            flexDirection: "row",
            gap: "5rem",
          }}
        >
          <p style={{ width: "20rem" }}>
            Do you want to charge your customes for requesting songs?
          </p>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <label
              htmlFor="yes"
              style={{ display: "flex", gap: "3px", alignItems: "center" }}
            >
              <input
                type="radio"
                name="yes"
                id="yes"
                style={{
                  accentColor: "#6741D9",
                }}
                checked={getData?.charge_customers}
                onChange={(e) => {
                  setGetData((prev) => {
                    return { ...prev, charge_customers: true };
                  });
                }}
              />
              Yes
            </label>
            <label
              htmlFor="no"
              style={{ display: "flex", gap: "3px", alignItems: "center" }}
            >
              <input
                type="radio"
                name="no"
                id="no"
                style={{
                  accentColor: "#6741D9",
                }}
                checked={!getData?.charge_customers}
                value={getData?.charge_customers}
                onChange={(e) =>
                  setGetData((prev) => {
                    return { ...prev, charge_customers: false };
                  })
                }
              />
              No
            </label>
          </div>
        </div>
        {/* container2 */}
        <div
          className="container2"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <p>Custom song request amount-</p>
          <input
            type="number"
            className="form-input"
            style={
              getData?.charge_customers
                ? { width: "16.5rem", textAlign: "center" }
                : {
                    width: "16.5rem",
                    textAlign: "center",
                    backgroundColor: "#C2C2C2",
                  }
            }
            name="amount"
            disabled={!getData?.charge_customers}
            value={getData?.amount?.category_6}
            onChange={(e) => {
              setGetData((prev) => {
                return {
                  ...prev,
                  amount: {
                    ...prev.amount,
                    category_6: e.target.value,
                  },
                };
              });
            }}
          />
        </div>
        {/* container3 */}
        <div
          className="container3"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <p>regular song request amounts, from high to low-</p>
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <input
              type="number"
              className="form-input"
              style={
                getData?.charge_customers
                  ? { width: "4rem" }
                  : {
                      width: "4rem",
                      backgroundColor: "#C2C2C2",
                    }
              }
              value={getData?.amount?.category_7}
              disabled={!getData?.charge_customers}
              onChange={(e) => {
                setGetData((prev) => {
                  return {
                    ...prev,
                    amount: {
                      ...prev.amount,
                      category_7: e.target.value,
                    },
                  };
                });
              }}
            />
            <input
              type="number"
              className="form-input"
              style={
                getData?.charge_customers
                  ? { width: "4rem" }
                  : { width: "4rem", backgroundColor: "#C2C2C2" }
              }
              value={getData?.amount?.category_8}
              disabled={!getData?.charge_customers}
              onChange={(e) => {
                setGetData((prev) => {
                  return {
                    ...prev,
                    amount: {
                      ...prev.amount,
                      category_8: e.target.value,
                    },
                  };
                });
              }}
            />
            <input
              type="number"
              className="form-input"
              style={
                getData?.charge_customers
                  ? { width: "4rem" }
                  : { width: "4rem", backgroundColor: "#C2C2C2" }
              }
              value={getData?.amount?.category_9}
              disabled={!getData?.charge_customers}
              onChange={(e) => {
                setGetData((prev) => {
                  return {
                    ...prev,
                    amount: {
                      ...prev.amount,
                      category_9: e.target.value,
                    },
                  };
                });
              }}
            />
            <input
              type="number"
              className="form-input"
              style={
                getData?.charge_customers
                  ? { width: "4rem" }
                  : { width: "4rem", backgroundColor: "#C2C2C2" }
              }
              value={getData?.amount?.category_10}
              disabled={!getData?.charge_customers}
              onChange={(e) => {
                setGetData((prev) => {
                  return {
                    ...prev,
                    amount: {
                      ...prev.amount,
                      category_10: e.target.value,
                    },
                  };
                });
              }}
            />
          </div>
        </div>
      </div>
      {/* Chart */}
      {getData?.charge_customers && (
        <div
          style={{
            width: "800px",
            height: "400px",
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "30px" }}>&#x20B9;</span>
          <BarChart
            width={600}
            height={300}
            data={data}
            barSize={20}
            fontSize="12px"
            fontFamily="Poppins"
            style={{
              fontFamily: "Poppins",
              fontSize: "14px",
              color: "white",
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3"   /> */}
            <XAxis
              dataKey="name"
              axisLine={{ stroke: "#FFFFFF" }}
              tickLine={false}
              tick={true}
            />
            <YAxis
              tick={false}
              axisLine={{ stroke: "#FFFFFF" }}
              tickLine={false}
              tickMargin={0}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                color: "black",
                fontFamily: "Poppins",
                fontSize: "14px",

                borderRadius: "5px",
              }}
            />

            <Bar dataKey="value" fill="#F0C3F1" />
          </BarChart>
        </div>
      )}
      <LoadingButton
        sx={{
          backgroundColor: "#6741D9",
          color: "white",
          fontFamily: "Poppins",
          "&:hover": {
            backgroundColor: "#4287f5",
          },
          width: "34rem",
          borderRadius: "10px",
          marginTop: "3rem",
          textDecoration: "capitalize",
          ":disabled": {
            backgroundColor: "#C2C2C2",
            color: "white",
            fontFamily: "Poppins",
          },
        }}
        disabled={
          !getData?.charge_customers ||
          getData?.amount.category_6 < 99 ||
          getData?.amount.category_7 < 79 ||
          getData?.amount.category_8 < 59 ||
          getData?.amount.category_9 < 39 ||
          getData?.amount.category_10 < 19
        }
        onClick={handleSave}
      >
        Save
      </LoadingButton>
    </div>
  );
};

export default Dashboard;
