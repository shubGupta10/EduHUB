import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Container, ListGroup } from 'react-bootstrap';
import { serverTimestamp } from 'firebase/firestore';
import { useFirebase } from '../../Context/FirebaseContext';
import { uploadMessages, subscribeToMessages } from '../../FireStoreDB/Db';
import './ChatRoom.css'; 

const ChatRoom = () => {
  const { user, matchUser } = useFirebase();
  const [currentUserInfo, setCurrentUserInfo] = useState({ displayName: '', role: '' });
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const getCurrentLoggedInUser = async () => {
      try {
        const currentUser = await matchUser(user);
        setCurrentUserInfo(currentUser);
      } catch (error) {
        console.error('Failed to get the current user', error);
      }
    };

    if (user) {
      getCurrentLoggedInUser();
    }
  }, [matchUser, user]);

  useEffect(() => {
    const unsubscribe = subscribeToMessages((updatedMessages) => {
      setMessages(updatedMessages);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        const messageData = {
          text: message,
          createdAt: serverTimestamp(),
          user: currentUserInfo.displayName,
        };

        await uploadMessages(messageData);
        setMessage('');
      } catch (error) {
        console.error("Failed to upload message:", error);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <Container className="chat-container">
      <div className="chat-box">
        <h1 className="text-center text-primary mb-4">Welcome {currentUserInfo.displayName} to the Chat</h1>
        <ListGroup className="message-list">
          {messages.map((msg) => (
            <ListGroup.Item
              key={msg.id}
              className={`message-item ${msg.user === currentUserInfo.displayName ? 'message-right' : 'message-left'}`}
            >
              <div className="message-content">
                <div className="message-header">
                  <strong>{msg.user}</strong>
                  <span className="text-muted ml-2">{formatDate(msg.createdAt)}</span>
                </div>
                <div className="message-text">
                  {msg.text}
                </div>
              </div>
            </ListGroup.Item>
          ))}
          <div ref={messagesEndRef} />
        </ListGroup>
        <Form onSubmit={handleSubmit} className="message-form mt-4">
          <div className="d-flex">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ flex: 1 }}
            />
            <Button variant="primary" type="submit" className="ml-3">
              Send
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default ChatRoom;
