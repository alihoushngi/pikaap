import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
function AccessScreen() {
  const [accessList, setAccessList] = useState([]);

  const NoAccessListed = () => {
    return (
      <div className="no-access-listed">{"سطح دسترسی تنظیم نشده است"}</div>
    );
  };

  return (
    <div id="access-screen-container">
      <section className="as-header">
        {/* TODO: add  breadcrumb */}
        <div className="as-breadcrumb" />
        <div className="add-access">
          <Link to={"add"}>
            <span>{"افزودن سطح دسترسی"}</span>
          </Link>
        </div>
      </section>

      {accessList.length > 0 ? (
        <section className="as-access-list-container"></section>
      ) : (
        <NoAccessListed />
      )}
    </div>
  );
}

export default AccessScreen;
