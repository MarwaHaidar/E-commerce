import React from 'react'
import styles from'./newarrival.module.css'
import New from '../../Assets/new.png'
import Gucci from '../../Assets/gucci.png'

const Newarrival = () => {
  return (
    <div>
    <div className={styles.main_container}>
      <div className={styles.first}></div>
      <div className={styles.second}>
      <div className={styles.third}>
      <div className={styles.txt1}>
  <div className={styles.txt2}>Women's Collection</div>
  <p className={styles.txt3}>Featured woman collections that give you another vibe.</p>
  <p className={styles.link}>Shop Now</p>
  </div>
  <img src={New} className={styles.new} />
  
</div>

        <div className={styles.fourth}>
          <div className={styles.fifth}></div>
          <div className={styles.sixth}>
            <div className={styles.maintxt}>
          <div className={styles.perftxt}>Women's Collection</div>
  <p className={styles.txt4}>Featured woman collections that give you another vibe.</p>
  <p className={styles.link1}>Shop Now</p>
  </div>
          <img src={Gucci} className={styles.perfume} />
          </div>

          </div>
        </div>
      </div>
      
    </div>
    
  )
}

export default Newarrival
