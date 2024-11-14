"use client"; //will run in the browser not in the server

import { useState, useEffect, FormEvent, useRef } from "react";

type Message = {
  id:number;
  sender:"user"|"bot";
  text:"string";
}

const chatPage = ()=>{
  const [messages, setMessages] = useState<Message[]>([]);
}