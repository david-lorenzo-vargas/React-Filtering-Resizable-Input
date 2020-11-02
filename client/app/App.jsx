import React from 'react';
import RangeInput from './components/range-input';
import Logo from './components/logo';
import Products from './components/products';
import styles from './app.scss';

const guitars = [
  {
    guitar: 'EPIPHONE LES PAUL',
    price: 99,
    image: 'https://sc1.musik-produktiv.com/pic-010119758xxl/epiphone-les-paul-standard-50s-vintage-sunburst.jpg',
  },
  {
    guitar: 'JACKSON JS1X RR',
    price: 160,
    image: 'https://sc1.musik-produktiv.com/pic-010106987xl/jackson-rr-minion-js1x-satin-black.jpg',
  },
  {
    guitar: 'IBANEZ GRGM21BKN',
    price: 178,
    image: 'https://i.ebayimg.com/images/g/tfwAAOSwwc5fdjqM/s-l640.jpg',
  },
  {
    guitar: 'LTD M-10',
    price: 189,
    image: 'https://images.musicstore.de/images/0960/esp-ltd-m-10-black_1_GIT0019930-000.jpg',
  },
  {
    guitar: 'SX PIRATE LES PAUL ',
    price: 247,
    image: 'data:image/jpeg;base64,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',
  },
  {
    guitar: 'YAMAHA REVSTAR RS320',
    price: 335,
    image: 'https://www.rimmersmusic.co.uk/images/yamaha-revstar-rs320-electric-guitar-ice-blue-p44561-96451_image.jpg',
  },
  {
    guitar: 'FENDER PLAYER SERIES TELECASTER PF 3 TONE SUNBURST',
    price: 572,
    image: 'https://www.pmtonline.co.uk/media/catalog/product/cache/a1b28cf8fc4652b664c189b33cb20963/5/8/58635-176477-fender-player-telecaster-1.jpg',
  },
  {
    guitar: 'FUJIGEN ODYSSEY BOUNDARY ',
    price: 685,
    image: 'https://www.pitbullaudio.com/media/catalog/product/f/g/fgn-bos-m-ocy_copy.jpg?quality=100&bg-color=255,255,255&fit=bounds&height=&width=',
  },
  {
    guitar: 'GODIN 5TH AVENUE KINGPIN P90 ',
    price: 719,
    image: 'https://godinguitars.com/wp-content/uploads/2018/07/31986_5th_Ave_P90_Cognacburst_.jpg',
  },
  {
    guitar: 'LTD EX-360',
    price: 715,
    image: 'https://static.bax-shop.es/image/product/42424/585729/ca52119a/450x450/1457964112ESP_BLACK_LEX50BLK_FRONT.JPG',
  },
  {
    guitar: 'DANGELICO PREMIER EXL1 ARCHTOP GUIT EL FIESTA',
    price: 799,
    image: 'https://www.adorama.com/images/Large/dgpssotctcb.jpg',
  },
  {
    guitar: 'JACKSON PRO SERIES SIGNATURE MICK THOMSON ART WHIT',
    price: 815,
    image: 'https://andertons-productimages.imgix.net/257520-1515087774881.png?w=680&h=680&fit=fill&bg=FFFFFF&auto=compress&auto=format',
  },
  {
    guitar: 'FENDER VINTERA 60S JAGUAR® MODIFIED HH SONIC',
    price: 999,
    image: 'https://www.pmtonline.co.uk/media/catalog/product/cache/a1b28cf8fc4652b664c189b33cb20963/7/8/78021-304907-fender-vintera-60s-jaguar-modified-1.jpg',
  },
  {
    guitar: 'PRS S2 STANDARD 24',
    price: 1259,
    image: 'https://images.reverb.com/image/upload/s--qZwE9DQx--/f_auto,t_supersize/v1557867458/c2q9orwpbua20qy1wep8.jpg',
  },
  {
    guitar: 'GIBSON LES PAUL SPECIAL TV',
    price: 1333,
    image: 'https://www.pmtonline.co.uk/media/catalog/product/cache/a1b28cf8fc4652b664c189b33cb20963/7/4/74917-302908-Les-Paul-Special-TV-Yellow-_1_.jpg',
  },
  {
    guitar: 'LTD IRON CROSS JAMES HETFIELD SNOW WHITE GUIT ELÉC',
    price: 1349,
    image: 'https://www.rimmersmusic.co.uk/images/esp-ltd-iron-cross-james-hetfield-electric-guitar-snow-white-p46017-105251_image.jpg',
  },
  {
    guitar: 'ESP E II ECLIPSE BB',
    price: 2199,
    image: 'https://andertons-productimages.imgix.net/378299-ES9704193%20%281%29.JPG?w=680&h=680&fit=fill&bg=FFFFFF&auto=compress&auto=format',
  },
  {
    guitar: 'ESP E II ECLIPSE EVERTUNE ',
    price: 2478,
    image: 'https://www.bhphotovideo.com/images/images2500x2500/esp_lec1000vb_ltd_ec_1000_vb_electric_1216614.jpg',
  },
  {
    guitar: 'PRS ELÉCT CUSTOM 24 08',
    price: 3995,
    image: 'https://www.woodbrass.com/images/SQUARE400/woodbrass/ADAGIO+055353.JPG',
  },

  {
    guitar: 'ESP FRX CTM SEE THRU',
    price: 6999,
    image: 'https://static.bax-shop.es/image/product/250238/578107/6cd5a3be/450x450/1457428871ESP_Original_Series_FRX_CTM_See_Thru_Black_Sunburst_Front.jpg',
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputActive: false,
      displayLeftValue: this.getMinPrice(),
      displayRightValue: this.getMaxPrice(),
      priceRange: {
        min: this.getMinPrice(),
        max: this.getMaxPrice(),
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLeftChange = this.handleLeftChange.bind(this);
    this.handleRightChange = this.handleRightChange.bind(this);
  }

  getMinPrice() {
    return Math.min(...guitars.map((item) => (item.price)));
  }

  getMaxPrice() {
    return Math.max(...guitars.map((item) => (item.price)));
  }

  getItems() {
    const { priceRange } = this.state;

    if (priceRange.min === '' || priceRange.max === '') {
      return guitars;
    }

    return this.filteredProducts();
  }

  filteredProducts() {
    const { priceRange } = this.state;

    const filteredProduct = guitars.filter((item) => {
      if (item.price >= priceRange.min && item.price <= priceRange.max) {
        return item;
      }

      return false;
    });
    return filteredProduct;
  }

  handleChange(values) {
    this.setState({
      displayRightValue: values.right,
      displayLeftValue: values.left,
      priceRange: {
        min: values.left,
        max: values.right,
      },
    });
  }

  handleLeftChange(event) {
    const { value } = event.currentTarget;
    const { priceRange } = this.state;
    let newState = {};

    if (value >= this.getMinPrice() && value <= priceRange.max) {
      newState = {
        inputActive: true,
        displayLeftValue: value,
        priceRange: {
          min: Number(value),
          max: priceRange.max === '' ? this.getMaxPrice() : priceRange.max,
        },
      };
    } else {
      newState = {
        ...priceRange,
        displayLeftValue: value,
      };
    }

    this.setState(newState);
  }

  handleRightChange(event) {
    const { value } = event.currentTarget;
    const { priceRange } = this.state;
    let newState = {};

    if (value <= this.getMaxPrice() && value >= priceRange.min) {
      newState = {
        inputActive: true,
        displayRightValue: value,
        priceRange: {
          max: Number(value),
          min: priceRange.min === '' ? this.getMinPrice() : priceRange.min,
        },
      };
    } else {
      newState = {
        ...priceRange,
        displayRightValue: value,
      };
    }

    this.setState(newState);
  }

  render() {
    const item = this.getItems();
    const {
      priceRange,
      inputActive,
      displayLeftValue,
      displayRightValue,
    } = this.state;
    const min = this.getMinPrice();
    const max = this.getMaxPrice();
    return (
      <div className={styles['app']}>
        <div className={styles['logo']}>
          <Logo />
        </div>
        <div className={styles['range-input']}>
          <RangeInput
            onChange={this.handleChange}
            spaces={20}
            sticky
            value={priceRange}
            minValue={min}
            maxValue={max}
            inputActive={inputActive}
          />
        </div>
        <div className={styles['input']}>
          <input
            className={styles['input__item']}
            type="text"
            value={displayLeftValue}
            onChange={this.handleLeftChange}
          />
          <input
            className={styles['input__item']}
            type="text"
            value={displayRightValue}
            onChange={this.handleRightChange}
          />
        </div>
        <div className={styles['products']}>
          <Products product={item} />
        </div>
      </div>
    );
  }
}

export default App;
