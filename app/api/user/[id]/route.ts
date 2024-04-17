import User from '@/models/user'
import connectdb from '@/util/mongodb'
import { NextResponse } from 'next/server'

export async function GET(request :any, { params }:any) {

  
  const { id } = params

  await connectdb()
  const user = await User.findOne({ _id: id })
  return NextResponse.json({ data: user }, { status: 200 })
}




export async function PUT(request: any, { params }: any) {
  try {
    const { id } = params;
    const { name, username, email, avatar,isAdmin,type } = await request.json();
    await connectdb();
    const user = await User.findOne({ email, _id: { $ne: id } });
    const existUsername = await User.findOne({ username,_id: { $ne: id } });
    if (type === 'info')
    {
      if (user) {
        return NextResponse.json(
          { message: 'Email is already used by Other user' },
          { status: 400 }
        );
      }
      else{
        if(existUsername){
          return NextResponse.json(
            { message: 'Username already exists' },
            { status: 400 }
          );
        }
      }
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, username, email, avatar,isAdmin},
      { new: true }
    );
  
    return NextResponse.json(
      { message: 'Profile and associated blogs updated', updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error',error},
      { status: 500 }
    );
  }

}



// export async function PATCH(request:any, { params }:any) {
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

//       const index = user.watchlist.find(blog => {
//         return blog === rid
//       })
//       user.watchlist.splice(index, 1)
//       user.save()
//     default:
//       break
//   }

//   return NextResponse.json({ message: 'Success' }, { status: 200 })
// }