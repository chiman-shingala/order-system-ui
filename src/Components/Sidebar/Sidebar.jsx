import React, { Fragment, useEffect, useState } from 'react'
import './Sidebar.css';
import logo from './../../assets/images/softclues.png'
import logo1 from './../../assets/images/02.png'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { successPopup } from '../../Shared/Constants/PopupConstant/PopupContant';
import Countdown from 'react-countdown';
import { getAuthLoginUser, signOut } from '../../Services/AuthService/AuthService';
import { Capitalize, dashboardWidth } from '../../Shared/Constants/Constant';
import { BiTachometer } from "react-icons/bi";
import * as ReactIcons from "react-icons/bi";
import { AiOutlineMenu, AiOutlinePoweroff } from "react-icons/ai";
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

/*eslint eqeqeq: "off"*/
function Sidebar(props) {
  const [isShow, setisShow] = useState(true);
  const [showCanvas, setshowCanvas] = useState(false)
  const [showMenu, setshowMenu] = useState();
  const AllMenu = useSelector(state => state.menu.menu);
  const [topHeight, settopHeight] = useState(0);
  const dispatch = useDispatch();
  const hideShowArrow = () => {
    setisShow(!isShow)
    props.expand();
    dashboardWidth(true);
  }

  const mouseEnterTrigger = (e) => {
    settopHeight(e.clientY)
  }
  
  useEffect(() => {
    setisShow(dashboardWidth())
  }, [])
  
  const closeCanvas = (i) => {
    if(!i){
      setshowCanvas(false)
    }
  }

  let MenuData = AllMenu?.filter((x) => x.ParentId == 0);
  MenuData?.forEach(element => {
    let childData = AllMenu?.filter(x => x.ParentId == element.Id);
    element.children = childData;
  });

  const ExpandMenu = (i, name) => {
    if(showMenu == i && !name){
      setshowMenu()
    }else{
      setshowMenu(i)
    }
  }
  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then(async (result) => {
      if (result.isConfirmed) {
          localStorage.clear();
          successPopup('You are logout.')
          setTimeout(() => {
            window.location.href = '/';
          }, 700);
      }
    })
  }
  const renderer =  ({ days, hours, minutes, seconds, completed}) => {
    hours = hours <= 9 ? '0'+hours : hours;
    minutes = minutes <= 9 ? '0'+minutes : minutes;
    seconds = seconds <= 9 ? '0'+seconds : seconds;
    if (completed) {
      signOut();
       return <span>{hours}:{minutes}:{seconds}</span>
    } else {
      return <span>{hours}:{minutes}:{seconds}</span>
    }
  }
  return (
    <>
        <div className='sidebar_bg bg-dark'>
          {
            isShow ? 
            <>
              <button className='Arrow_Button' onClick={hideShowArrow}>
                <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 12 12"><title>ctrl left</title><g fill="#212121" className="nc-icon-wrapper"><path d="M8.625.219A1,1,0,0,0,7.219.375l-4,5a1,1,0,0,0,0,1.25l4,5a1,1,0,0,0,1.562-1.25L5.281,6l3.5-4.375A1,1,0,0,0,8.625.219Z" fill="#212121"></path></g></svg>
              </button>
            </>: 
            <>
              <button className='Arrow_Button' onClick={hideShowArrow}>
                <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 12 12"><title>right arrow</title><g fill="#212121" className="nc-icon-wrapper"><path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" fill="#212121"></path></g></svg>
              </button>
            </>
          }
          <NavLink to='/dashboard'><div className='logo_section' style={{width : isShow ? '' : '50px' , height : isShow ? '' : '50px'}}>
            <img src={isShow ? logo1 : logo} alt="" width='100%' />
          </div></NavLink>
          <hr className='bg-white text-white my-2' />
        <div className='d-flex justify-content-between align-items-center'>
          <h5 className='text-center text-white m-0' style={{ fontSize: "15px", flex: 1 }}>
            {Capitalize(getAuthLoginUser()?.firstname + " " + getAuthLoginUser()?.lastname)}
          </h5>
          <div className='hoverIcon py-1 px-3'onClick={logout}style={{position: 'relative', cursor: 'pointer' }}>
            <AiOutlinePoweroff color='white' size={30} />
          </div>
        </div>
          <hr className='bg-white text-white my-2' />
          <h5 className='text-center text-white margin'>
            <span className='h6 d-block'>Logout reminder</span>
            <Countdown 
            date={new Date(getAuthLoginUser()?.expires).getTime()-1000} 
            renderer={renderer}
          />
          </h5>
          <div className='sidebar_menu p-2'>
            {
              MenuData?.map((x,i) => {
                let Icon = ReactIcons[x.Icon];
                return <Fragment key={i}>
                  <NavLink to={`/${x.Path}`} onClick={() => ExpandMenu(i)} onMouseEnter={mouseEnterTrigger}>
                    <span style={{ margin : isShow ? '' : '0px auto'}} >
                      <Icon size={isShow ? 25 : 35} className='icon' style={{transition : '300ms', margin : isShow ? '' : '0px auto'}} />
                      <div className={isShow ? 'd-none' : 'menu_hover shadow-lg'} style={{top: topHeight}}>{x.Name}</div>
                    </span>
                       
                    <span className='ms-1' style={{display : isShow ? '' : 'none'}}>
                      {x.Name}
                    </span>
                  </NavLink>
                
                  <div className='childMenu' style={{display : showMenu == i ? '' : 'none'}}>
                      {
                        x.children?.map((y,index) => {
                          let Icon = ReactIcons[y.Icon];
                          return <NavLink to={`${x.Path+'/'+y.Path}`} onClick={() => ExpandMenu(i , 'child')} className='ms-4' key={index}>
                              <span style={{ margin : isShow ? '' : '0px auto'}}>
                                <Icon size={isShow ? 25 : 35} className='icon' style={{transition : '300ms', margin : isShow ? '' : '0px auto'}} />
                                <div className={isShow ? 'd-none' : 'menu_hover shadow-lg'}>{y.Name}</div>
                              </span>
                                
                              <span className='ms-1' style={{display : isShow ? '' : 'none'}}>
                                {y.Name}
                              </span>
                            </NavLink>
                        })
                      }
                  </div>
                </Fragment>
              })
            }
          </div>
        </div>  

        <div className='topNav_bg d-md-none d-block '>
          <div className='d-flex text-white justify-content-between align-items-center h-100'>
            <div className='topNav_logo_bg'>
              <img src={logo} alt="" width={30} />
            </div>
            <div>
              <AiOutlineMenu size={18} onClick={() => setshowCanvas(true)}  />
            </div>
          </div>
        </div> 

        <Offcanvas show={showCanvas} onHide={closeCanvas} className="navbarCanvas">
        <Offcanvas.Header closeVariant='white' closeButton>
          <span></span>
        </Offcanvas.Header>
        <Offcanvas.Body className='p-0'>
          <hr className='bg-white text-white my-2' />
          <div className='d-flex justify-content-between align-items-center'>
            <h4 className='text-center text-white m-0' style={{ fontSize: "15px", flex: 1 }}>
              {Capitalize(getAuthLoginUser()?.firstname + " " + getAuthLoginUser()?.lastname)}
            </h4>
            <div className='hoverIcon py-1 px-3' onClick={logout} style={{ cursor: 'pointer' }}>
              <AiOutlinePoweroff color='white' size={30} />
            </div>
          </div>
          <hr className='bg-white text-white my-2' />
          <h4 className='text-center text-white margin'>
            <span className='h6 d-block'>Logout reminder</span>
            <Countdown 
            date={new Date(getAuthLoginUser()?.expires).getTime()-1000} 
            renderer={renderer}
          />
          </h4>
          <div className='sidebar_menu p-2'>
              {
                MenuData?.map((x,i) => {
                  let Icon = ReactIcons[x.Icon];
                  return <Fragment key={i}>
                    <NavLink to={`/${x.Path}`} onClick={() => { ExpandMenu(i); closeCanvas(x.children?.length > 0);}}>
                      <span>
                        <Icon size={isShow ? 25 : 35} className='icon' />
                      </span>
                        
                      <span className='ms-1'>
                        {x.Name}
                      </span>
                    </NavLink>
                  
                    <div className='childMenu' style={{display : showMenu == i ? '' : 'none'}}>
                        {
                          x.children?.map((y,index) => {
                            let Icon = ReactIcons[y.Icon];
                            return <NavLink to={`${x.Path+'/'+y.Path}`} onClick={() => { ExpandMenu(i , 'child'); closeCanvas(); }} className='ms-4' key={index}>
                                <span>
                                  <Icon size={isShow ? 25 : 35} className='icon' />
                                </span>
                                  
                                <span className='ms-1' style={{display : isShow ? '' : 'none'}}>
                                  {y.Name}
                                </span>
                              </NavLink>
                          })
                        }
                    </div>
                  </Fragment>
                })
              }
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Sidebar