import autoretrato from '../assets/08_05_24 autoretrato chistoso 1.png'
import styles from "../styles/index.module.css"
import { Link } from "react-router-dom"

import { motion, scale } from 'motion/react'
import CustomMotionComponent from '../utils/customMotionComponent'

function Index() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <aside className={styles.mainAside}>
        <h1>Hi!</h1>
        <p>My name is Santiago Ramírez Enríquez, a junior software engineer.
          I'm passionate for programming both websites and games that people can enjoy interacting with.</p>
        <p className={styles.disclaimer}>Disclaimer: Site is best experienced horizontally</p>
        <div className={styles.buttonContainer}>
          <CustomMotionComponent
            as={Link}
            className={`${styles.indexButton} ${styles.pinkButton}`}
            to={"/Santy-Website/projects"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            Projects
          </CustomMotionComponent>
          <CustomMotionComponent
            as={Link}
            className={`${styles.indexButton} ${styles.blueButton}`}
            to={"/Santy-Website/education"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            Education
          </CustomMotionComponent>
        </div>

      </aside>
      <div className={styles.mainImageContainer}>
        <img src={autoretrato}></img>
      </div>

    </motion.div>
  )
}

export default Index
