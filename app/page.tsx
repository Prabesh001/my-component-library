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
    <div className="p-4 flex flex-col gap-8">
      <div>
        <strong>capitalize()</strong>
        <p>{cap}</p>
        <hr />
      </div>

      <div>
        <strong>capitalizeSentence()</strong>
        <p>{capsen}</p>
        <hr />
      </div>

      <div>
        <strong>useLocalStorage() hook</strong>
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
      </div>

      <div>
        <strong>Avatar for your profile pic</strong>
        <Avatar src={""} alt="Image" size={35} />
        <small>|| Must also download fallback image</small>
        <hr />
      </div>

      <div>
        <strong>Click the click button of useLocalStorage for Popup</strong>
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
      </div>

      <div>
        <strong>Popover</strong>
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
    </div>
  );
}
