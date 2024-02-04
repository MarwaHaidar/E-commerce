import React from 'react'
import styles from'./newarrival.module.css'
import New from '../../Assets/new.png'
import Gucci from '../../Assets/gucci.png'
import Dress from '../../Assets/dress.png'
import Shoes from '../../Assets/shoes5.png'

const Newarrival = () => {
  return (
    <div>
      <div className={styles.newarrival}>
    <p >New Arrivals</p></div>
    <div className={styles.main_container}>
      <div className={styles.first}>
      <img src={Dress} className={styles.dress} />
      </div>
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
          <div className={styles.fifth}>
          <div className={styles.maintxt}>
          <div className={styles.perftxt}>Men's Collection</div>
  <p className={styles.txt4}>Featured men collections that give you another vibe.</p>
  <p className={styles.link1}>Shop Now</p>
  </div>
          <img src={Shoes} className={styles.shoes} />
          </div>
          <div className={styles.sixth}>
            <div className={styles.maintxt}>
          <div className={styles.perftxt}>Men's Collection</div>
  <p className={styles.txt4}>Featured men collections that give you another vibe.</p>
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
