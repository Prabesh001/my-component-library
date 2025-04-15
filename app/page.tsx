"use client";
import Avatar from "@/components/Avatar";
import Popover from "@/components/Popover";
import Popup from "@/components/Popup";
import { capitalize, capitalizeSentence } from "@/functions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);
  const str = "hello world. how you doing";
  const cap = capitalize(str);
  const capsen = capitalizeSentence(str);

  const [key, setKey] = useLocalStorage("key", 1);

  return (
    <div>
      <p>capitalize()</p>
      <p>{cap}</p>
      <hr />

      <p>capitalizeSentence()</p>
      <p>{capsen}</p>
      <hr />

      <p>useLocalStorage() hook</p>
      <p>{key}</p>
      <button
        onClick={() => {
          setKey(key + 2);
          setShow(!show);
        }}
      >
        click
      </button>

      <hr />

      <p>Avatar for your profile pic</p>
      <Avatar src={""} alt="Image" size={35} />

      <hr />

      <p>Click the click button of useLocalStorage for Popup</p>
      <Popup
        isOpen={show}
        onClose={() => setShow(false)}
        popupClassName="w-[90vw] sm:w-[60vw] bg-gray-400"
        crossClassName="text-white"
        content={
          <div className="text-black">
            <p>Hello</p>
          </div>
        }
      />

      <hr />

      <p>Popover</p>
      <Popover
        parentContent={
          <>
            <button>Hello</button>
          </>
        }
        childrenContent={
          <>
            <button>Hello</button>
          </>
        }
        popoverParentClassName={"bg-green-800"}
        popoverChildClassName={"top-0 left-0"}
      />
      <hr />
    </div>
  );
}
