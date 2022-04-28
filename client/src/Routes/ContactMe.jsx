import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterSquare, AiOutlineMail, AiOutlineGlobal } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';

const ContactMe = () => {
    return (
        <div className='h-fit flex items-center flex-col justify-center py-8 md:py-24'>
            <div className='m-4 md:m-8 p-2'>
                <p className='text-4xl md:text-6xl text-slate-800 font-bold p-2 text-center'>Hi there 👋</p>
                <p className='text-xl md:text-2xl text-slate-800 p-2 text-center'>Let's Connect 👇</p>
            </div>
            <div className='flex flex-wrap w-4/5 mb-10 justify-center items-center'>
                <a href='mailto:akashvaghela09@gmail.com' rel="noreferrer" target="_blank" className="flex flex-col justify-center items-center m-4 bg-slate-700 rounded active:translate-y-1 cursor-pointer w-24 h-24">
                    <AiOutlineMail className='text-6xl fill-slate-300' />
                    <p className='text-slate-300'>Mail</p>
                </a>
                <a href='https://akashvaghela.dev' rel="noreferrer" target="_blank" className="flex flex-col justify-center items-center m-4 bg-slate-700 rounded active:translate-y-1 cursor-pointer w-24 h-24">
                    <AiOutlineGlobal className='text-6xl fill-slate-100' />
                    <p className='text-slate-300'>My Site</p>
                </a>
                <a href='https://github.com/akashvaghela09' rel="noreferrer" target="_blank" className="flex flex-col justify-center items-center m-4 bg-slate-700 rounded active:translate-y-1 cursor-pointer w-24 h-24">
                    <AiFillGithub className='text-6xl fill-slate-100' />
                    <p className='text-slate-300'>GitHub</p>
                </a>
                <a href='https://linkedin.com/in/akashvaghela09' rel="noreferrer" target="_blank" className="flex flex-col justify-center items-center m-4 bg-slate-700 rounded active:translate-y-1 cursor-pointer w-24 h-24">
                    <AiFillLinkedin className='text-6xl fill-slate-100' />
                    <p className='text-slate-300'>LinkedIn</p>
                </a>
                <a href='https://discordapp.com/users/akashvaghela09#4543' rel="noreferrer" target="_blank" className="flex flex-col justify-center items-center m-4 bg-slate-700 rounded active:translate-y-1 cursor-pointer w-24 h-24">
                    <FaDiscord className='text-6xl fill-slate-100' />
                    <p className='text-slate-300'>Discord</p>
                </a>
                <a href='https://twitter.com/akashvaghela09' rel="noreferrer" target="_blank" className="flex flex-col justify-center items-center m-4 bg-slate-700 rounded active:translate-y-1 cursor-pointer w-24 h-24">
                    <AiFillTwitterSquare className='text-6xl fill-slate-100' />
                    <p className='text-slate-300'>Twitter</p>
                </a>
            </div>
        </div>
    )
}

export { ContactMe }