import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Nav, Form, Button, Row, Col } from "react-bootstrap";
import { SessionContext } from "../../services/sessionContext";
import DropdownMenu from "../Drop-Down-Menu/DropdownMenu";
import BranchFrontEndService from "../../services/storefront/branchFrontEndService";

function Header() {
  const branchFrontEndService = new BranchFrontEndService();
  const { employee, user, basket } = useContext(SessionContext) || {};
  const basketNum = basket.length;
  const [localBranch, setLocalBranch] = useState(null);
  const location = useLocation();
  const minimalHeader =
    location.pathname === "/checkout" ||
    location.pathname === "/returns" ||
    location.pathname === "/employee";
  const disableNav = location.pathname === "/search";

  const headerClass =
    location.pathname === "/" ||
    location.pathname === "/help" ||
    minimalHeader ||
    location.pathname.startsWith("/employee")
      ? "header mb-0"
      : "header";

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setSearchText("");
  }, [location]);

  useEffect(() => {
    if (user && !localBranch) {
      async function loadData() {
        try {
          const getBranch = await branchFrontEndService.get("/readRecords", {
            BranchID: user.BranchID,
          });
          setLocalBranch(getBranch.data[0]);
        } catch (error) {
          console.error("Error getting header branch information", error);
        }
      }

      loadData();
    }
  }, [user]);

  return (
    <header className={headerClass}>
      <Container fluid>
        {minimalHeader ? (
          <>
            {/* Logo */}
            <Row className="pt-1">
              <Col className="d-flex">
                <img
                  src="/AML-logo.png"
                  alt="Advanced Media Library Logo"
                  style={{ height: "3rem" }}
                />
                <h2
                  style={{
                    color: "var(--primary)",
                    marginLeft: "0.5rem",
                    marginTop: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  Advanced Media Library
                </h2>
              </Col>
              <Col className="d-flex justify-content-end"></Col>
            </Row>
          </>
        ) : (
          <>
            <Row className="border-bottom border-secondary">
              <Col>
                {localBranch ? (
                  <span>
                    <strong>Home Branch: </strong>
                    {localBranch.FirstLineAddress},{" "}
                    {[localBranch.City, " ", localBranch.Postcode]}
                  </span>
                ) : (
                  <span>
                    Press <Link to="/account">here</Link> to login for personalised results
                  </span>
                )}
              </Col>
              <Col className="text-end">
                <span className="d-inline">
                  Need <Link to="/help">help?</Link>
                </span>
              </Col>
            </Row>

            {/* Logo and Search */}
            <Row className="pt-1">
              <Col className="d-flex">
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/AML-logo.png"
                    alt="Advanced Media Library Logo"
                    style={{ height: "3rem" }}
                  />
                  <h2
                    style={{
                      color: "var(--primary)",
                      marginLeft: "0.5rem",
                      marginTop: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    Advanced Media Library
                  </h2>
                </Link>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form className="d-flex align-items-center">
                  <DropdownMenu
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                  <Link 
                    to="/search" 
                    state={{ searchTerm: searchText }} 
                    aria-label={`Search for ${searchText || "products"}`}
                  >
                    <Button
                      className="button-secondary me-2"
                      style={{ borderRadius: "0 5px 5px 0" }}
                    >
                      <i className="bi bi-search"></i>
                    </Button>
                  </Link>
                  <Button
                    className="button-secondary"
                    style={{ borderRadius: "5px 0 0 5px" }}
                    as={Link}
                    to="/basket"
                  >
                    <i className="bi bi-basket"></i>
                  </Button>
                  <span
                    className="highlight-primary"
                    style={{ borderRadius: "0 5px 5px 0" }}
                  >
                    {basketNum || "0"}
                  </span>
                </Form>
              </Col>
            </Row>

            {/* Navigation Links */}
            <Row>
              <Col>
                {!disableNav && (
                  <Nav className="justify-content-start">
                    <Nav.Link
                      as={Link}
                      className="nav-link-secondary"
                      to="/search"
                      state={{ preFilterType: "Book" }}
                    >
                      Books
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      className="nav-link-secondary"
                      to="/search"
                      state={{ preFilterType: "Journal" }}
                    >
                      Journals
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      className="nav-link-secondary"
                      to="/search"
                      state={{ preFilterType: "Periodical" }}
                    >
                      Periodicals
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      className="nav-link-secondary"
                      to="/search"
                      state={{ preFilterType: "CD" }}
                    >
                      CDs
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      className="nav-link-secondary"
                      to="/search"
                      state={{ preFilterType: "DVD" }}
                    >
                      DVDs
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      className="nav-link-secondary"
                      to="/search"
                      state={{ preFilterType: "Game" }}
                    >
                      Games
                    </Nav.Link>
                  </Nav>
                )}
              </Col>
              <Col>
                <Nav className="justify-content-end">
                  <Nav.Link
                    as={Link}
                    className="nav-link-secondary"
                    to="/account#library"
                  >
                    My Library
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className="nav-link-secondary"
                    to="/account#account"
                  >
                    Account
                  </Nav.Link>
                </Nav>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </header>
  );
}

export default Header;
