
import { Link } from "react-router-dom";
import './ChatList.css'
import { useContext, useRef, useEffect } from "react";
import { ContactContext } from "../../contexts/ContactContext.jsx";
import AddNewContact from "../AddNewContact/AddNewContact";
import SearchContact from "../SearchContact/SearchContact.jsx";

const ChatList = () => {
  const { contacts, contactosFiltrados } = useContext(ContactContext);

  if (!contacts) return null;

  const listToRender = Array.isArray(contactosFiltrados) 
    ? contactosFiltrados
    : contacts;

  const scrollRef = useRef(null);
  const prevListLengthRef = useRef(listToRender.length);

  useEffect(() => {
    const prev = prevListLengthRef.current;
    const current = listToRender.length;
    if (current > prev && scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
    prevListLengthRef.current = current;
  }, [listToRender.length]);

  return (
    <div className="chat-list-full-side">
      <div className="chat-list-container">
        <div className="chat-list-header">
          <SearchContact />
        </div>

        {listToRender.length === 0 ? (
          <div className="no-results">No hay contactos con ese nombre</div>
        ) : (
          <div className="chat-list-scroll" ref={scrollRef}>
            {listToRender.map((contact) => (
              <Link to={'/chat/' + contact.id} key={contact.id} className="chat-link">
                <img className="profile-picture" src={contact.profile_picture} alt={'Foto de ' + contact.name} />
                <div className="chat-link-body">
                  <h2 className="profile-name">{contact.name}</h2>
                  <span className="last-connection">{contact.last_connection}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="add-new-wrapper">
          <AddNewContact />
        </div>
      </div>
    </div>
  );
};



export default ChatList