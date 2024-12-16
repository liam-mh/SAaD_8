import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import moment from "moment";
import MediaCard from "../Media-Card/MediaCard";
import MediaFrontEndService from "../../services/storefront/mediaFrontEndService";
import NewMediaRequestFrontEndService from "../../services/storefront/newMediaRequestFrontEndService";
import EmailFrontEndService from "../../services/notification/emailFrontEndService";

const MediaRequestForm = ({ MemberID }) => {
  const mediaFrontEndService = new MediaFrontEndService();
  const newMediaRequestFrontEndService = new NewMediaRequestFrontEndService();
  const emailFrontEndService = new EmailFrontEndService();
  const [mediaTitle, setTitle] = useState("");
  const [mediaType, setType] = useState("");
  const [mediaReason, setReason] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadyInDB, setAlreadyInDB] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (!MemberID) {
      alert("Login to make a media request");
      return;
    }

    // Check if already exists in Media
    try {
      const allItems = await mediaFrontEndService.get("/readRecords", {
        Title: mediaTitle,
        Type: mediaType,
      });

      if (allItems.data.length > 0) {
        setAlreadyInDB(true);
      } else {
        try {
          const response = await newMediaRequestFrontEndService.post(
            "/createRecord",
            {
              Title: mediaTitle,
              Type: mediaType,
              Reason: mediaReason,
              Date: moment().format("YYYY-MM-DD"),
              MemberID: MemberID,
            }
          );
          await emailFrontEndService.post("/send", {
            to: "procurements@AML.com", // put in personal to test
            subject: "New Media Request",
            message: `
							A new media item has been requested, 
							please login to the portal to approve.

							Title: ${mediaTitle}
							Type: ${mediaType}
							Reason: ${mediaReason}
						`,
          });
        } catch (error) {
          console.log("error creating submission: ", error);
        }
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error checking media existence:", error);
    }
  };

  const media = { Title: mediaTitle, Type: mediaType };
  if (isSubmitted) {
    return (
      <div>
        {alreadyInDB ? (
          <Row className="mb-3">
            <Col>
              <span>
                Good news!
                <br />
                <br />
                We already have the Media you are looking for!
              </span>
            </Col>
            <Col>
              <MediaCard media={media} isSearchResult={true} />
            </Col>
          </Row>
        ) : (
          <span>
            Your media request has been submitted, thank you for the
            contribution.
          </span>
        )}
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmission}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Media Title</Form.Label>
        <Form.Control
          className="form-secondary"
          type="text"
          value={mediaTitle}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicType">
        <Form.Label>Media Type</Form.Label>
        <Form.Select
          className="form-secondary"
          value={mediaType}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Select Media Type</option>
          <option value="DVD">DVD</option>
          <option value="Book">Book</option>
          <option value="Journal">Journal</option>
          <option value="Periodical">Periodical</option>
          <option value="CD">CD</option>
          <option value="Game">Game</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicReason">
        <Form.Label>Reason</Form.Label>
        <Form.Control
          className="form-secondary"
          as="textarea"
          rows={3}
          value={mediaReason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </Form.Group>
      <Button className="button-secondary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default MediaRequestForm;
