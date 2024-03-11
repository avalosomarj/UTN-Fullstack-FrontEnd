import React from 'react'
import '../Assets/css/footer.css'
import { VscGithubInverted } from 'react-icons/vsc'
import { TiSocialLinkedin } from 'react-icons/ti'
import { FaNode } from 'react-icons/fa'
import { DiReact } from 'react-icons/di'
import { GrMysql } from 'react-icons/gr';

const Footer = () => {
  return (
    <footer>
        <div className='overInfo'>
            <span>Diplomatura en Programación Web</span>
            <span>Full Stack Developer</span>
            <span>Proyecto Final</span>
        </div>
        <div className='underInfo'>
          <div className='usedTechs'>
            <span>Tecnologías usadas</span>
            <div className='usedTechsIcons'>
              <FaNode style={{color: '#6cc24a'}} title='NodeJS'/>
              <GrMysql style={{color: '#00758F'}} title='MySQL'/>
              <DiReact style={{color: '#61DBFB'}} title='React'/>
            </div>
          </div>
          <div className='socialNetworks'>
            <span>Desarrollador</span>
            <div className='socialNetworksIcons'>
              <a href='https://github.com/avalosomarj/' target='_blank'><div className='logoGitHub'><VscGithubInverted/></div></a>
              <a href='https://www.linkedin.com/in/avalosomarj/' target='_blank'><div className='logoLinkedIn'><TiSocialLinkedin/></div></a>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer