import User from '@/models/user'
import connectdb from '@/util/mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request : NextRequest, { params }:any) {

  
  const { id } = params

  await connectdb()
  const user = await User.findOne({ _id: id })
  return NextResponse.json({ data: user }, { status: 200 })
}




export async function PUT(request: NextRequest, { params }: any) {
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



export async function PATCH(request: NextRequest, { params }: any) {
  const { id } = params;
  const { type, rid } = await request.json();

  try {
      switch (type) {
          case 'addToSavelist':
              await User.findByIdAndUpdate(id, {
                  $push: { savelist: rid },
              });
              break;
          case 'removeSavelist':
              const user = await User.findById(id);
              if (!user) {
                  return NextResponse.json({ message: 'User not found' }, { status: 404 });
              } else {
                  const index = user.savelist.indexOf(rid);
                  if (index > -1) {
                      user.savelist.splice(index, 1);
                      await user.save();
                  }
              }
              break;
          default:
              break;
      }

      return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error: any) {
      console.error('Error in PATCH handler:', error.message);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

