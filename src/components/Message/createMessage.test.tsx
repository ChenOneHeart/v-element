import { describe, test, vi, expect } from "vitest";
import { createMessage, closeAll } from "./methods";
import { nextTick } from "vue";

function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element);
  const topValue = styles.getPropertyValue("top");
  return Number.parseFloat(topValue);
}

export const rAF = async () => {
  return new Promise(res => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
};

describe("createMessage", () => {
  test("调用方法应该创建对应的Message组件", async () => {
    const instance = createMessage({
      message: "这是一个message消息提示",
      duration: 0,
    });
    await rAF();
    expect(document.querySelector(".vc-message")).toBeTruthy();
    instance.destroy();
    await rAF();
    expect(document.querySelector(".vc-message")).toBeFalsy();
  });
  test("多次调用方法应该创建多个实例", async () => {
    createMessage({
      message: "这是一个message消息提示",
      duration: 0,
    });
    createMessage({
      message: "这是一个message消息提示",
      duration: 0,
    });
    await rAF();
    expect(document.querySelectorAll(".vc-message").length).toEqual(2);
    closeAll();
    await rAF();
    expect(document.querySelector(".vc-message")).toBeFalsy();
  });
  test("创建多个实例应该设置正确的offset", async () => {
    createMessage({
      message: "这是一个message消息提示",
      duration: 0,
      offset: 100,
    });
    createMessage({
      message: "这是一个message消息提示",
      duration: 0,
      offset: 50,
    });
    await rAF();
    const elements = document.querySelectorAll(".vc-message");
    expect(elements.length).toBe(2);
    const firstElementTop = getTopValue(elements[0]);
    const secondElementTop = getTopValue(elements[1]);
    console.log('top',firstElementTop, secondElementTop);
    expect(firstElementTop).toBe(100);
    expect(secondElementTop).toBe(150);
  });
});
