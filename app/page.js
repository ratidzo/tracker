'use client'

import React, {useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, addDoc, getDoc, query,
   onSnapshot, querySnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { toDisplayCurrencyUnits,
        toStorageCurrencyUnits } from './lib/converter';


export default function Home() {

  const [items, setItems] = useState([
    // {name: 'Coffee', price: 4.95},
    // {name: 'Movie', price: 24.95},
    // {name: 'candy', price: 7.95},
  ]);

  const [newItem, setNewItem] = useState({name: '', price: ''});
  const [total, setTotal] = useState(0);

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '') {
      //  setItems([...items, newItem]);
      try {

        const docRef = await addDoc(collection(db, 'items'), {
          name: newItem.name.trim(),
          price: newItem.price,
        });
        setNewItem({ name: '', price: '' })
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  }

  // Read items from database
  useEffect(() => {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = []

      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id})
      })
      setItems(itemsArr);

      // Read total from itemsArr
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseInt(item.price), 
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    })
  }, [])

  // Delete items from database
  const deleteItem = async (id) => {
    deleteDoc(doc(db, 'items', id));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>

        <div className='bg-slate-200 shadow
         dark:shadow-none dark:bg-slate-800 p-4 rounded-lg'>
          <form className='grid grid-cols-6 items-center text-black'>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className='col-span-3 p-3 border' type='text' 
              placeholder='Enter item'
            />
            <input
              value={toDisplayCurrencyUnits(newItem.price)}
              onChange={(e) => setNewItem({
                 ...newItem, price:  toStorageCurrencyUnits(e.target.value)})}
              className='col-span-2 p-3 border mx-3'
              type='number' 
              placeholder='Enter $'
             />
            <button
             onClick={addItem}
             className='text-white
             bg-slate-700 hover:bg-slate-600 
              dark:bg-slate-950
              dark:hover:bg-slate-900 p-3 text-xl'
             type='submit'
             >
              +
             </button>
          </form>

          <ul>
            {items.map((item, id) => (
              <li key={id} 
                className='my-4 w-full flex justify-between
                    border-b-2 border-slate-300/50 dark:border-none
                    dark:text-white dark:bg-slate-950' 
                >
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>${toDisplayCurrencyUnits(item.price).toFixed(2)}</span>
                </div>
                <button onClick={() => deleteItem(item.id)}
                  className='dark:hover:bg-slate-900 dark:bg-slate-950
                  bg-slate-700 hover:bg-slate-600
                  border-l-2 dark:border-slate-900 p-4 ml-8'>
                  <Image alt='X' width={24} height={24}
                  src={'/delete.svg'}/>
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (''): ( 
            <div className='flex justify-between p-3'>
              <span>Total</span>
              <span>${toDisplayCurrencyUnits(total).toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
