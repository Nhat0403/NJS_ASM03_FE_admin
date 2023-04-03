import queryString from 'query-string';
import { useEffect, useState } from 'react';
import ChatRoomsAPI from '../../API/ChatRoomsAPI';
import { onBlurHandler, onChangeHanlder, valid, validRequire } from '../../util/validators';
import Input from '../UI/Input';
import './ChatList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
// import io from 'socket.io-client';
// const socket = io('http://54.254.177.24:5000', { transports : ['websocket']});

const ChatList = () => {
  const [chatSearch, setChatSearch] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [valid({ type: true })]
  });
  const [textMessage, setTextMessage] = useState('');
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [load, setLoad] = useState(false);
  const idUser = localStorage.getItem('id_user');

  useEffect(() => {
    const getAllRoom = async() => {
      const params = {
        idUser: idUser
      }
      const query = '?' + queryString.stringify(params);
      const response = await ChatRoomsAPI.getAllRoom(query);
      setChatList(response);
      if(response) {
        setLoad(false);
      }
    }
    getAllRoom();
  }, [])
  
  const onChat = (e) => {
    e.preventDefault();
    setRoomId(e.target.id);
    console.log(e.target.id);
  }

  const getMessageByRoomId = async () => {
		const response = await ChatRoomsAPI.getMessageByRoomId(roomId);
		console.log(response);
		setMessage(response.content);
    // socket.on('receive_message', (data) => {
		// 	setLoad(true);
		// });
    if(response) {
      setLoad(false);
    }
	};

  const handlerSend = async() => {
    const params = {
      message: textMessage,
      roomId: roomId,
      idUser: idUser
    }
    const query = '?' + queryString.stringify(params);
    if(roomId && textMessage.trim() !== '') {
      await ChatRoomsAPI.addMessage(query);
			setTextMessage('');
			
			setTimeout(() => {
				setLoad(true);
        getMessageByRoomId();
        // socket.emit('send_message', params);
			}, 200);
      setLoad(false);
    }
  }  

  useEffect(() => {
    const searchMessage = async() => {
      const params = {
        idUser: idUser,
        chatSearch: chatSearch.value
      }
      const query = '?' + queryString.stringify(params);
      const response = await ChatRoomsAPI.searchMessage(query);
      setChatList(response);
    }
    searchMessage();
  }, [chatSearch]);

	useEffect(() => {
    setLoad(true);
    if(roomId.trim() !== '') {
      getMessageByRoomId();
    }
    setTimeout(() => {
      setLoad(false)
    }, 2000)
	}, [roomId])

  return (
    <div>
      <h1>Chat</h1>
      <em>Apps / Chat</em>
      {load && (
				<div className='wrapper_loader'>
					<div className='loader'></div>
				</div>
			)}
      {!load && 
      <div className='bg-white container'>
        <div className="chatInfo flex-column">
          <div className="chatSearch">
            <Input 
              control='input'
              type='search'
              id='chatSearch'
              placeholder='Search Contact'
              required={true}
              onChange={e => onChangeHanlder(e, setChatSearch, chatSearch.validators)}
              onBlur={e => onBlurHandler(e, setChatSearch, chatSearch.validators)}
              value={chatSearch.value}
              isValid={chatSearch.valid}
              isTouched={chatSearch.touched}
              className='chatListItem chatListSearch'
            />
            <div className='chatList'>
            {chatList && chatList.map(value => 
              <div 
                key={value._id} 
                className='flex chatListItem'
              >
                <img
                  className='avatar'
                  src='https://img.icons8.com/color/36/000000/administrator-male.png'
                  alt='...'
                />
                <div 
                  id={value._id.toString()} 
                  onClick={onChat}
                >{value._id}</div>
              </div>
            )}
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatMedia">
            {message && message.map(value =>
              value.is_admin ? (
                <div
                  className='media media-chat media-chat-right'
                  key={value._id}>
                  <div className='media-body'>
                    <p>You: {value.message}</p>
                  </div>
                </div>
              ) : (
                <div
                  className='media media-chat media-chat-reverse'
                  key={value._id}>
                  {' '}
                  <img
                    className='avatar'
                    src='https://img.icons8.com/color/36/000000/administrator-male.png'
                    alt='...'
                  />
                  <div className='media-body' key={value.id}>
                    <p>Client: {value.message}</p>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="chatField flex">
            <input 
              type='text'
              id='textMessage'
              placeholder='Type and enter'
              required={true}
              onChange={e => setTextMessage(e.target.value)}
              value={textMessage}
              className='chatListItem'
            />
            <div className='chatFieldIcon'>
              <button onClick={handlerSend} className='chatFieldBtn'>
                <FontAwesomeIcon icon={faPaperPlane} className="sbIcon" />
              </button>
            </div>
          </div>
        </div>   
      </div>
      }
    </div>
  )
};

export default ChatList;