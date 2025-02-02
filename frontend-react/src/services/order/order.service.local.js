
import { storageService } from '../async-storage.service'
import { makeId, loadFromStorage, saveToStorage } from '../util.service'
import { userService } from '../user'
// localStorage.clear()
const ORDERS_STORAGE_KEY = 'order';

_createOrders()

query()
console.log(query({ tag: 'logo design' }))
export const orderService = {
  query,
  getById,
  save,
  remove,
  addOrderMsg
}
window.cs = orderService


async function query() {
  let orders;

  try {
    orders = await storageService.query(ORDERS_STORAGE_KEY); // Fetch orders from storage or API
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return orders;
}


function getById(orderId) {
  return storageService.get(ORDERS_STORAGE_KEY, orderId)
}

async function remove(orderId) {
  // throw new Error('Nope')
  await storageService.remove(ORDERS_STORAGE_KEY, orderId)
}

async function save(order) {
  var savedOrder
  if (order._id) {
    const orderToSave = {
      _id: order._id,
      price: order.price,
      speed: order.speed,
    }
    savedOrder = await storageService.put(ORDERS_STORAGE_KEY, orderToSave)
  } else {
    const orderToSave = {
      owner: order.owner.fullname,
      price: order.price,
      speed: order.speed,
      // Later, owner is set by the backend
      owner: userService.getLoggedinUser(),
      msgs: []
    }
    savedOrder = await storageService.post(ORDERS_STORAGE_KEY, orderToSave)
  }
  return savedOrder
}

async function addOrderMsg(orderId, txt) {
  // Later, this is all done by the backend
  const order = await getById(orderId)

  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt
  }
  order.msgs.push(msg)
  await storageService.put(ORDERS_STORAGE_KEY, order)

  return msg
}

function _createOrders() {
  let orders = loadFromStorage(ORDERS_STORAGE_KEY); // Use the new ORDERS_STORAGE_KEY for orders
  if (!orders || !orders.length) {
    const orders = [ 
      {
        _id: 'o1230',
        serialNumber: 'SN1230',
        deliveryTime: '2',
        buyer: 'user6',
        seller: {
          name: 'David Smith',
          imgUrl: '/img/faces/david smith.jpg',
          id: "gZtWO"
        },
        order: {
          _id: 'g106',
          title: 'I will teach you guitar lessons online',
          img: '/img/img6.jpg',
          price: 60.00,
        },
        package: 'Basic',
        category: 'Music',
        orderDate: 'Jan 20, 2025',
        status: 'Fulfilled',
      },
      {
        _id: 'o1231',
        serialNumber: 'SN1231',
        deliveryTime: '4',
        buyer: 'user5',
        seller: {
          name: 'Emily Ray',
          imgUrl: '/img/faces/Emily Ray.jpg',
          id: "gZtWO"
        },
        order: {
          _id: 'g107',
          title: 'I will make a personalized fitness plan',
          img: '/img/img7.jpg',
          price: 150.00,
        },
        package: 'Premium',
        category: 'Fitness',
        orderDate: 'Jan 19, 2025',
        status: 'Pending',
      },
      {
        _id: 'o1232',
        serialNumber: 'SN1232',
        deliveryTime: '4',
        buyer: 'user8',
        seller: {
          name: 'John Miller',
          imgUrl: '/img/faces/John Miller.jpg',
          id: "gZtWO"
        },
        order: {
          _id: 'g108',
          title: 'I will translate your documents',
          img: '/img/img8.jpg',
          price: 80.00,
        },
        package: 'Standard',
        category: 'Language',
        orderDate: 'Jan 18, 2025',
        status: 'Fulfilled',
      },
      {
        _id: 'o1233',
        serialNumber: 'SN1233',
        deliveryTime: '2',
        buyer: 'mini-user',
        seller: {
          name: 'Dudu Da',
          imgUrl: '/img/faces/Dudu Da.jpg',
          id: "gZtWO"
        },
        order: {
          _id: 'g101',
          title: 'I will design your logo',
          img: '/img/img1second.jpg',
          price: 100.00,
        },
        package: 'Basic',
        category: 'Design',
        orderDate: 'Jan 17, 2025',
        status: 'Pending',
      },
      {
        _id: 'o1234',
        serialNumber: 'SN1234',
        deliveryTime: '4',
        buyer: 'user2',
        seller: {
          name: 'Mark Twain',
          imgUrl: '/img/faces/Mark Twain.jpg',
        },
        order: {
          _id: 'g103',
          title: 'I will help you with your social media',
          img: '/img/img3second.jpg',
          price: 400.00,
        },
        package: 'Advanced',
        category: 'Marketing',
        orderDate: 'Jan 16, 2025',
        status: 'Pending',
      },
      {
        _id: 'o1235',
        serialNumber: 'SN1235',
        deliveryTime: '1',
        buyer: 'user4',
        seller: {
          name: 'Lugas V',
          imgUrl: '/img/faces/Lugas V.jpg',
        },
        order: {
          _id: 'g104',
          title: 'I will edit your YouTube song video',
          img: '/img/img4second.jpg',
          price: 150.00,
        },
        package: 'Premium',
        category: 'Video Editing',
        orderDate: 'Jan 15, 2025',
        status: 'Pending',
      },
      {
        _id: 'o1236',
        serialNumber: 'SN1236',
        deliveryTime: '4',
        buyer: 'user7',
        seller: {
          name: 'Saar Lee',
          imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXHkQFT4WKaduMz0dAab_wSnD-Wah2EEmrybYyKjKPw9vvFBoE1uYjrjI&s',
        },
        order: {
          _id: 'g105',
          title: 'I will create a professional website for you',
          img: '/img/img5.jpg',
          price: 800.00,
        },
        package: 'Advanced',
        category: 'Web Development',
        orderDate: 'Jan 14, 2025',
        status: 'Pending',
      },
      {
        _id: 'o1237',
        serialNumber: 'SN1237',
        deliveryTime: '5',
        buyer: 'user3',
        seller: {
          name: 'Jane Doe',
          imgUrl: '/img/faces/Jane Doe.jpg',
        },
        order: {
          _id: 'g102',
          title: 'I will write a compelling blog post',
          img: '/img/img2second.jpg',
          price: 250.00,
        },
        package: 'Standard',
        category: 'Writing',
        orderDate: 'Jan 13, 2025',
        status: 'Pending',
      },
    ];
    
    
    
    
      
    
    // Save orders to localStorage using the new key
    saveToStorage(ORDERS_STORAGE_KEY, orders);
  }
}
