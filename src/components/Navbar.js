import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, NavLink, Navbar, Dropdown, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import logo from "../Assets/images/htnav.png";
import { connect } from "react-redux";
import {
  storeToLocalStorage,
  KEY_IS_LOGGED_IN,
  USER_ACCOUNT_LOGOUT,
} from "../utils/Constant";
import { useDispatch } from "react-redux";

// const NavigationItems = [
//   { id: 2, title: "Customers", link: "/" },
//   { id: 3, title: "Vendors", link: "#" },
//   { id: 4, title: "Products", link: "/Product" },
//   { id: 5, title: "Accounting", link: "#" },
//   { id: 6, title: "Expense", link: "/Expense" },
//   { id: 7, title: "Transportation", link: "#" },
//   { id: 8, title: "Report", link: "/Report" },
// ];

const dropdownActions = {
  2: [
    { id: 1, title: "Customers", link: "/" },
    { id: 2, title: "Invoice", link: "/Invoice" },
  ],
  3: [
    { id: 1, title: "Vendors", link: "/vendor" },
    { id: 2, title: "Purchase", link: "/Purchase" },
  ],
  5: [
    {
      id: 1,
      title: "Customer Receipt",
      link: "/Receipt",
    },
    {
      id: 2,
      title: "Supplier Receipt",
      link: "/Payment",
    },
  ],
  6: [
    {
      id: 2,
      title: "Employee",
      link: "/Employee",
    },
    {
      id: 3,
      title: "Category",
      link: "/ExpenseCategory",
    },
    {
      id: 4,
      title: "Expense",
      link: "/Expense",
    },
  ],
  7: [
    {
      id: 1,
      title: "Vehicle",
      link: "/Vehicle",
    },
    {
      id: 2,
      title: "Vehicle Invoice",
      link: "/VehicleInvoice",
    },
  ],
};

function Navigation(props) {
  

  const [NavigationItems, setNavigationItem] = useState([
    { id: 2, title: "Customers", link: "/" },
    { id: 3, title: "Vendors", link: "#" },
    { id: 4, title: "Products", link: "/Product" },
    { id: 5, title: "Accounting", link: "#" },
    { id: 6, title: "Expense", link: "/Expense" },
    { id: 7, title: "Transportation", link: "#" },
    { id: 8, title: "Report", link: "/Report" },
  ]);
  useEffect(() => {
    if (props.users.UserRoleID === 2) {
      setNavigationItem(
        NavigationItems.filter((item) => {
          return item.id != 8 && item.id !=3;
        })
      );
    }
  }, [NavigationItems]);

  const dispatch = useDispatch();

  return (
    <Navbar
      className="f-14 fw-500 mb-5 fixed-top"
      bg="light"
      expand="xl"
      style={{ paddingLeft: 20 }}
    >
      <Row className="w-100 top-2">
        <Col xxl={2} lg={2} className="">
          <Navbar.Brand className="w-10" href="/">
            <img
              className=""
              style={{ height: "40px", width: 170 }}
              src={logo}
              alt="logo"
            ></img>
          </Navbar.Brand>
        </Col>
        <Col
          xxl={10}
          lg={10}
          className="d-flex align-items-center justify-content-between"
        >
          <div xxl={9} lg={9} className="">
            <Navbar.Toggle>
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse className="">
              <Nav className="ml-10p f-16" variant="underline">
                {NavigationItems.map((item) =>
                  dropdownActions[item.id] ? (
                    <Dropdown
                      className=""
                      style={{ paddingLeft: "2%" }}
                      key={item.id}
                    >
                      <Dropdown.Toggle
                        className="f-16"
                        style={{ border: "none" }}
                        variant=""
                        id={`dropdown-${item.title}`}
                      >
                        {item.title}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {dropdownActions[item.id].map((action) => (
                          <Dropdown.Item
                            className=""
                            key={action.id}
                            as={Link}
                            to={action.link}
                          >
                            {action.title}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <NavLink
                      className=" ml-4p trans"
                      style={{ border: "none", marginLeft: "2%" }}
                      key={item.id}
                      as={Link}
                      to={item.link}
                    >
                      {item.title}
                    </NavLink>
                  )
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
          <div
            xxl={4}
            lg={4}
            className=" me-5 d-flex justify-content-end align-items-center"
          >
            <Nav className="me-2 text-end ms-5 d-flex align-items-center">
              <Dropdown align={{ lg: "start" }}>
                <Dropdown.Toggle
                  className="d-flex align-items-center"
                  align={{ lg: "start" }}
                  style={{
                    border: "2px solid black",
                    background: "transparent",
                    color: "black",
                    marginLeft: "5px",
                  }}
                >
                  <span
                    className="fw-bold fs-5"
                    style={{
                      color: "#5f6170",
                    }}
                  >
                    {" "}
                    {props.users.loginName}
                  </span>

                  <RxAvatar
                    className="rounded-circle ms-3"
                    style={{
                      color: "white",
                      border: "1px solid #25316f",
                      fontSize: 30,
                      background: "#25316f",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-30" style={{}}>
                  <Dropdown.Item className="fw-bolder fs-6" onClick={() => {
                    storeToLocalStorage(KEY_IS_LOGGED_IN, false);
                    dispatch({type: USER_ACCOUNT_LOGOUT})
                  }}>
                    Signout
                  </Dropdown.Item>
                  <Dropdown.Item className='fw-bolder fs-6'>
                    <Link to="/ResetPassword" style={{ textDecoration: 'none', color: '#1d1d5e' }}>Reset Password</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </div>
        </Col>
      </Row>
    </Navbar>
  );
}

const mapsToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapsToProps)(Navigation);
