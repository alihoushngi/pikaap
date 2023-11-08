import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  AgentDataUsers,
  DashboardScreen,
  DriversDataUsers,
  PassengersDataUsers,
  TripDataUsers,
  MonthlyMembership,
  FinancialGroups,
  TravelGroups,
  Transactions,
  NotFound,
  SuperAgentDataUser,
  InvoiceDataUsers,
  TravelScreen,
  AccessScreen,
  AddAccessScreen,
} from "../panel/screens";
import Layout from "../panel/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import "./index.scss";

function PanelRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={"dashboard"} />} />

        <Route
          path="dashboard"
          element={<ProtectedRoute Component={<DashboardScreen />} />}
        />
        <Route
          path="access"
          element={<ProtectedRoute Component={<AccessScreen />} />}
        />
        <Route
          path="access/add"
          element={<ProtectedRoute Component={<AddAccessScreen />} />}
        />
        <Route
          path="superAgent"
          element={<ProtectedRoute Component={<SuperAgentDataUser />} />}
        />
        <Route
          path="agenacies"
          element={<ProtectedRoute Component={<AgentDataUsers />} />}
        />
        <Route
          path="drivers"
          element={<ProtectedRoute Component={<DriversDataUsers />} />}
        />
        <Route
          path="passengers"
          element={<ProtectedRoute Component={<PassengersDataUsers />} />}
        />
        <Route
          path="invoice"
          element={<ProtectedRoute Component={<InvoiceDataUsers />} />}
        />
        <Route
          path="trip"
          element={<ProtectedRoute Component={<TravelScreen />} />}
        />
        <Route
          path="monthlyMembership"
          element={<ProtectedRoute Component={<MonthlyMembership />} />}
        />
        <Route
          path="financialGroups"
          element={<ProtectedRoute Component={<FinancialGroups />} />}
        />
        <Route
          path="travelGroups"
          element={<ProtectedRoute Component={<TravelGroups />} />}
        />
        <Route
          path="transactions"
          element={<ProtectedRoute Component={<Transactions />} />}
        />
        <Route path="setting" element={<h2>Setting</h2>} />
        <Route
          path="/*"
          element={<ProtectedRoute Component={<NotFound />} />}
        />
      </Routes>
    </Layout>
  );
}

export default PanelRoutes;
