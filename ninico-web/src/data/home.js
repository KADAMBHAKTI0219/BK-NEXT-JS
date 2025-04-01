import banner1 from '../../public/assets/images/banner1.jpg'
import banner2 from '../../public/assets/images/banner2.jpg'
import banner3 from '../../public/assets/images/banner3.jpg'
import bannerslider01 from '../../public/assets/images/bannerslider01.jpg'
import bannerslider02 from '../../public/assets/images/bannerslider02.jpg'


export const links = [
    {id:1,link:'Value Of The Day'},
    {id:2,link:'Top 100 Offers'},
    {id:3,link:'New Arrivals'},
]

export const Navbar = [
    {id:1,link:'Home',href:'/',subtitle:[
        {id:1,link:'Wooden Home',href:'/'},
        {id:2,link:'Furniture Home',href:'/'},
        {id:3,link:'Cosmetics Home',href:'/'},
    ]},
    {id:2,link:'Shop',href:'/shop'},
    {id:1,link:'Pages',href:'/page'},
    {id:2,link:'Blog',href:'/shop'},
    {id:3,link:'Contact',href:'/contact'},
]

export const HeroCarousel = [
    {id:1,title:'40% Off',image:banner1},
    {id:2,title:'35% Off',image:banner2},
    {id:3,title:'45% Off',image:banner3},
]

export const HeroSideBanner =[
    {id:1,title:'New Modern Stylist Crafts',subTitle:'Hand made',image:bannerslider01},
    {id:2,title:'Energy with our newest collection',subTitle:'Popular',image:bannerslider02},
]