import React, { use, useContext, useEffect, useState } from 'react'
import { getContacts } from '../services/contactService.js';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ChatList from '../Components/ChatList/ChatList.jsx';
import ChatDetail from '../Components/ChatDetail/ChatDetail.jsx';
import './ChatScreen.css'
import  { ContactContext } from '../contexts/ContactContext.jsx';


const ChatScreen = () => {
  
 //aca estaban todos los useState y useEffect relacionados a contacts
 //ahora van al ContactContext
  const {chat_id} = useParams()
  const {loading, contacts, chatDetail, setChatId, createNewMessage, AddNewContact} = useContext(ContactContext);
  const navigate = useNavigate();

  // mobileView: 'both' (desktop/tablet large) | 'list' | 'detail'
  const [mobileView, setMobileView] = useState(() => (typeof window !== 'undefined' && window.innerWidth <= 768) ? 'list' : 'both');
  
  useEffect(
    () => {
      setChatId(chat_id)
    },
    [chat_id]
  )

  // When route/chat changes on small screens, switch to detail view
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      if (chat_id) setMobileView('detail');
      else setMobileView('list');
    } else {
      setMobileView('both');
    }
  }, [chat_id])

  // listen resize to adapt mobile/desktop behavior
  useEffect(() => {
    function onResize() {
      if (window.innerWidth <= 768) {
        // if currently both, switch to list by default
        setMobileView((v) => (v === 'both' ? 'list' : v));
      } else {
        setMobileView('both');
      }
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [])

  function handleBackOnMobile() {
    setMobileView('list');
    navigate('/chat');
  }
  
  
  return (
    <div className="chat-screen-root">
     {/*  <Link to="/chat" className="main-link">
        <h1 className='Titulo'>Mensajeria en REACT</h1>
      </Link>
 */}
      <div className='chat-screen'>

        <div className={`contact-list ${mobileView === 'detail' ? 'hidden-mobile' : ''}`}>
          {/* panel izquierdo: lista de chats */}
          {
            loading 
            ? <span className='loading-span'>Cargando...</span>
            : contacts && <ChatList/>
          }
        </div>

        {/* panel derecho: chat seleccionado */}
        <div className={`chat-detail ${mobileView === 'list' ? 'hidden-mobile' : ''}`}>
          {
            !loading && (
              !chat_id
              ? <h2>Seleccione un chat</h2>
              : ( 
                chatDetail
                ? <ChatDetail chatDetail={chatDetail} createNewMessage={createNewMessage} onBack={handleBackOnMobile} />
                : <h2>Chat no encontrado</h2>
              )
            )
          }
        </div>
      </div>

    </div>
    )
}




export default ChatScreen