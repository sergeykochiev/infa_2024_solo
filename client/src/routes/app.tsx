// import { useEffect, useState } from 'react'
// import './index.css'
// // import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// const exampleItem = {
//   id: 1,
//   name: 'dupa',
//   rarity: 4
// }

// function Root() {
//   const [items, setItems] = useState<Array<ItemType>>([])

//   useEffect(() => {
//     const fetchAllItems = async () => {
//       const res = await fetch('/api/item')
//       if (!res.ok) {
//         throw new Error(`Server error with status ${res.status}`)
//       }
//       const json = await res.json()
//       setItems(json)
//     }
//     try {
//       fetchAllItems()
//     } catch (error) {
//       alert(error)
//       return
//     }
//   }, [])

//   const fetchAddItem = async (newItem: ItemType) => {
//     const res = await fetch('/api/item/create', {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: 'POST',
//       body: JSON.stringify(newItem)
//     })
//     if (!res.ok) {
//       throw new Error(`Server error with status ${res.status}`)
//     }
//   }

//   const fetchRemoveItem = async (id: number) => {
//     const res = await fetch(`/api/item/${id}`, {
//       method: 'DELETE',
//     })
//     if (!res.ok) {
//       throw new Error(`Server error with status ${res.status}`)
//     }
//   }

//   const fetchUpdateItem = async (updateItem: ItemUpdateType) => {
//     const res = await fetch(`/api/item/${updateItem.id}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: 'PATCH',
//       body: JSON.stringify({
//         name: updateItem.name && updateItem.name,
//         rarity: updateItem.rarity && updateItem.rarity
//       })
//     })
//     if (!res.ok) {
//       throw new Error(`Server error with status ${res.status}`)
//     }
//   }

//   const addItem = async (newItem: ItemType) => {
//     if (items.find(item => item.id == newItem.id)) {
//         alert('There is already an item with that ID!')
//         return
//     }
//     try {
//       await fetchAddItem(newItem)
//     } catch (error) {
//       alert(error)
//       return
//     }
//     setItems([ ...items, newItem ])
//     return
//   }

//   const removeItem = async (id: number) => {
//     try {
//       await fetchRemoveItem(id)
//     } catch (error) {
//       alert(error)
//       return
//     }
//     setItems(items.filter(item => item.id != id))
//     return
//   }

//   const updateItem = async (updateItem: ItemUpdateType) => {
//     try {
//       await fetchUpdateItem(updateItem)
//     } catch (error) {
//       alert(error)
//       return
//     }
//     setItems(items.map(item => {
//       if (item.id == updateItem.id) {
//         item.name = updateItem.name ? updateItem.name : item.name
//         item.rarity = updateItem.rarity ? updateItem.rarity : item.rarity
//       }
//       return item
//     }))
//     return
//   }

//   return (
//     <div className='flex m-16 h-full justify-center gap-8 flex-col px-80'>
//       <ItemForm onclick={addItem}></ItemForm>
//       <ItemContainer>
//         {items.map((item: ItemType) => {
//           return <Item key={item.id} item={item} deleteF={removeItem} updateF={updateItem}></Item>
//         })}
//       </ItemContainer>
//     </div>
//   )
// }

// export default Root
