import { useState } from "react";
import Modal from "../Modal/Modal";
import "./styles.css";

function SimpleTree() {
  const [tree, setTree] = useState([]);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState(0);

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  function addHandler(current_position) {
    setPosition(current_position);
    showModal();
  }

  function addRootNode() {
    let newTree = [...tree];
    newTree.push({ title: "Start", position: 1 });
    setTree(newTree);
  }

  function addSingleNode() {
    let newTree = [...tree];
    var n = 2 * position - tree.length;
    var i = 1;
    console.log(n, i);
    if (n < i) {
      newTree[2 * position - 1] = {
        title: 2 * position,
        position: 2 * position,
      };
    } else {
      while (i < n) {
        console.log("i:" + i + ", " + (position + i));
        newTree.push({ title: null, position: 2 * position - (n - i) });
        i++;
      }
      newTree.push({ title: "Node", position: 2 * position });
    }
    setTree(newTree);
    console.log(newTree);
    hideModal();
  }

  function addDoubleNode() {
    let newTree = [...tree];
    var n = 2 * position - tree.length;
    var i = 1;
    console.log(n, i);
    if (n < i) {
      newTree[2 * position - 1] = {
        title: 2 * position,
        position: 2 * position,
      };
      newTree[2 * position] = {
        title: 2 * position + 1,
        position: 2 * position + 1,
      };
    } else {
      while (i < n) {
        console.log("i:" + (position + i));
        newTree.push({ title: null, position: position + i });
        i++;
      }
      newTree.push({ title: "true", position: 2 * position });
      newTree.push({ title: "false", position: 2 * position + 1 });
    }

    setTree(newTree);
    console.log(newTree);
    hideModal();
  }

  function deleteNode(deleteIndex) {
    let newTree = [...tree];
    newTree[deleteIndex - 1] = {
      title: newTree[2 * deleteIndex - 1].title,
      position: newTree[deleteIndex - 1].position,
    };
    newTree[2 * deleteIndex - 1] = {
      title: null,
      position: 2 * deleteIndex,
    };
    if (
      newTree[deleteIndex].title === null &&
      newTree[2 * deleteIndex] !== undefined
    ) {
      newTree[deleteIndex] = {
        title: newTree[2 * deleteIndex].title,
        position: newTree[deleteIndex].position,
      };
      newTree[2 * deleteIndex] = {
        title: null,
        position: 2 * deleteIndex + 1,
      };
    }

    setTree(newTree);
    console.log(newTree);
  }

  function TextBox({ index, handleDelete }) {
    const [showDelete, setShowDelete] = useState(false);
    return (
      <div
        contentEditable={true}
        className="text-box"
        onMouseEnter={() => {
          setShowDelete(true);
        }}
        onMouseLeave={() => {
          setShowDelete(false);
        }}
      >
        {tree[index - 1].title}
        {showDelete && (
          <div className="delete-icon" onClick={() => handleDelete(index)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="white"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </div>
        )}
      </div>
    );
  }

  function Node({ index, hasSibling, siblingIndex }) {
    return (
      tree[index - 1] &&
      tree[index - 1].title !== null && (
        <div className="container">
          {hasSibling === true && (
            <div
              style={{
                borderTop: "3px solid white",
                width: "60%",
                transform: `translate(${
                  siblingIndex === 0 ? `50%` : `-50%`
                }, -50%)`,
              }}
            />
          )}
          <div
            style={{
              borderLeft: "3px solid white",
              height: `${tree[index - 1].position !== 1 ? "30px" : "0px"}`,
              marginTop: `${tree[index - 1].position !== 1 ? "-4.2px" : "0"}`,
            }}
          />
          {tree[index - 1].title === "true" ||
          tree[index - 1].title === "false" ? (
            tree[index - 1].title === "true" ? (
              <>
                <div style={{ marginLeft: "100px" }} />
                <div className={`thumbs-left`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    fill="white"
                  >
                    <path d="M24 24H0V0h24v24z" fill="none" />
                    <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z" />
                  </svg>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginLeft: "100px" }} />
                <div className={`thumbs-right`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    fill="white"
                  >
                    <path d="M24 24H0V0h24v24z" fill="none" />
                    <path d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2V4zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34C17 5.05 15.95 4 14.66 4h-8.1c-.71 0-1.36.37-1.72.97l-2.67 6.15z" />
                  </svg>
                </div>
              </>
            )
          ) : (
            <TextBox index={index} handleDelete={deleteNode} />
          )}
          <div
            style={{
              borderLeft: "3px solid white",
              height: "30px",
            }}
          />
          {(tree[2 * index - 1] === undefined ||
            tree[2 * index - 1].title === null) && (
            <button
              className="button-add"
              onClick={() => addHandler(tree[index - 1].position)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          )}

          <div
            style={{
              borderLeft: "3px solid white",
              height: `${
                tree[2 * index]
                  ? tree[2 * index].title !== null
                    ? "30px"
                    : "0px"
                  : "0px"
              }`,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Node
              hasSibling={
                tree[2 * index] ? (tree[2 * index].title ? true : false) : false
              }
              siblingIndex={0}
              index={2 * index}
            />
            {tree[2 * index] && tree[2 * index].title && (
              <div style={{ width: "50px" }}></div>
            )}
            <Node hasSibling={true} siblingIndex={1} index={2 * index + 1} />
          </div>
        </div>
      )
    );
  }

  return (
    <div className="container">
      <Modal show={show} handleClose={hideModal}>
        <h3>Select the type of node</h3>
        <div className="modal-row">
          <div className="modal-icon" onClick={addSingleNode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="#2cc990"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z" />
            </svg>
          </div>
          <div className="modal-icon" onClick={addDoubleNode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="#2c82c9"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 8c0 1.11-.9 2-2 2h-2v2h4v2H9v-4c0-1.11.9-2 2-2h2V9H9V7h4c1.1 0 2 .89 2 2v2z" />
            </svg>
          </div>
        </div>
      </Modal>
      {tree.length === 0 ? (
        <button className="button-root-add" onClick={() => addRootNode()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z" />
          </svg>
        </button>
      ) : (
        <Node index={tree[0].position} />
      )}
    </div>
  );
}

export default SimpleTree;
