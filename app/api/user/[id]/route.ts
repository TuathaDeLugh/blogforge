import User from '@/models/user'
import connectdb from '@/util/mongodb'
import { NextResponse } from 'next/server'

export async function GET(request :any, { params }:any) {

  
  const { id } = params

  await connectdb()
  const user = await User.findOne({ _id: id })
  return NextResponse.json({ data: user }, { status: 200 })
}




// export async function PUT(request:any, { params }:any) {
//   const { id } = params;
//   const { name, username, email, avatar,role } = await request.json();
//   await connectdb();
//   const updatedUser = await User.findByIdAndUpdate(
//     id,
//     { name, username, email, avatar,role },
//     { new: true }
//   );

//   await Review.updateMany(
//     { 'creator.userid': id },
//     {
//       $set: {
//         'creator.createdby': updatedUser.username,
//         'creator.avatar': updatedUser.avatar,
//       },
//     }
//   );

//   await Review.updateMany(
//     { 'comments.userid': id },
//     {
//       $set: {
//         'comments.$.username': updatedUser.username,
//         'comments.$.useravatar': updatedUser.avatar,
//       },
//     }
//   );

//   return NextResponse.json(
//     { message: 'Profile and associated reviews updated', updatedUser },
//     { status: 200 }
//   );
// }



// export async function PATCH(request, { params }) {
//   const { id } = params
//   const { type, id: rid } = await request.json()

//   switch (type) {
//     case 'addToWatchlist':
//       await User.findByIdAndUpdate(id, {
//         $push: { watchlist: rid },
//       })
//       break
//     case 'removeWatchlist':
//       const user = await User.findById(id)

//       const index = user.watchlist.find(review => {
//         return review === rid
//       })
//       user.watchlist.splice(index, 1)
//       user.save()
//     default:
//       break
//   }

//   return NextResponse.json({ message: 'Success' }, { status: 200 })
// }