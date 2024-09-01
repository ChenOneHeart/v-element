import { test, describe, expect, vi, beforeAll } from "vitest";
import { h } from "vue";
import { mount, type VueWrapper, type DOMWrapper } from "@vue/test-utils";
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
const onChange = vi.fn();
let wrapper: VueWrapper;
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[];
let firstHeader: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>,
  firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  thirdHeader: DOMWrapper<Element>,
  thirdContent: DOMWrapper<Element>;

describe("Collapse.vue", () => {
  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse modelValue={["a"]} onChange={onChange}>
          <CollapseItem title="title A" name="a">
            content A
          </CollapseItem>
          <CollapseItem title="title B" name="b">
            content B
          </CollapseItem>
          <CollapseItem disabled title="title C" name="c">
            content C
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["Icon"],
        },
        attachTo: document.body,
      }
    );
    headers = wrapper.findAll(".vk-collapse-item__header");
    contents = wrapper.findAll(".vk-collapse-item__wrapper");
    firstHeader = headers[0];
    secondHeader = headers[1];
    thirdHeader = headers[2];
    firstContent = contents[0];
    secondContent = contents[1];
    thirdContent = contents[2];
  }),
    test("测试组件基础结构以及对应文本", async () => {
      expect(headers.length).toBe(3);
      expect(contents.length).toBe(3);
      expect(firstHeader.text()).toBe("title A");
      expect(firstContent.isVisible()).toBeTruthy();
      expect(secondContent.isVisible()).toBeFalsy();
      expect(firstContent.text()).toBe("content A");
    });
  test("点击标题展开/关闭对应内容", async () => {
    await firstHeader.trigger("click");
    expect(firstContent.isVisible()).toBeFalsy();
    await secondHeader.trigger("click");
    expect(secondContent.isVisible()).toBeTruthy();
  });
  test("发送正确的事件", async () => {
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith([]);
    expect(onChange).toHaveBeenLastCalledWith(["b"]);
  });
  test("disabled的内容应该没有反应", async () => {
    onChange.mockClear(); // 清除事件
    expect(thirdHeader.classes()).toContain("is-disabled");
    await thirdHeader.trigger("click");
    expect(thirdContent.isVisible()).toBeFalsy();
    expect(onChange).not.toHaveBeenCalled();
  });
  test.skip("跳过的测试用例", () => {});
  test.only("只测试当前用例");
});
