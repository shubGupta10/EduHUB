import React, { useEffect, useState } from 'react';
import { Form, Button, Container, ListGroup } from 'react-bootstrap';
import { serverTimestamp } from 'firebase/firestore';
import { useFirebase } from '../../Context/FirebaseContext';
import { fetchMessages, uploadMessages } from '../../FireStoreDB/Db';
import './ChatRoom.css';

const ChatRoom = () => {
  const { user, matchUser } = useFirebase();
  const [currentUserInfo, setCurrentUserInfo] = useState({ displayName: '', role: '' });
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [unsubscribe, setUnsubscribe] = useState(null);

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
    const loadMessages = async () => {
      try {
        const fetchedMessages = await fetchMessages();
        setMessages(fetchedMessages);
        const unsubscribe = await fetchMessages((newMessages) => {
          setMessages(newMessages);
        });
        setUnsubscribe(() => unsubscribe);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    loadMessages();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [fetchMessages]);

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
    <Container className="d-flex justify-content-center align-items-center chat-container">
      <div className="chat-box">
        <h1>Welcome {currentUserInfo.displayName} to the Chat</h1>
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
        </ListGroup>
        <Form onSubmit={handleSubmit} className="message-form">
          <div className="d-flex align-items-center">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ flex: 1 }}
            />
            <Button variant="primary" type="submit" className="ml-2">
              Send
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default ChatRoom;
