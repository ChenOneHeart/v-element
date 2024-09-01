import { test, describe, expect, vi } from "vitest";
import { h } from "vue";
import { mount } from "@vue/test-utils";
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
describe("Collapse.vue", () => {
  test("basic collapse", async () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ["a"],
      },
      slots: {
        default: (
          <>
            <CollapseItem title="title A" name="a">
              content A
            </CollapseItem>
            <CollapseItem title="title B" name="b">
              content B
            </CollapseItem>
            <CollapseItem disabled title="title C" name="c">
              content C
            </CollapseItem>
          </>
        ),
      },
      global: {
        stubs: ["Icon"],
      },
      attachTo: document.body,
    });
    // console.log(wrapper.html());
    /**
     * CollapseItem的测试用例
     * 1.属性
     * 2.内容
     * 3.事件
     * 4.disabled
     */
    // 为什么要获取headers
    const item = wrapper.findAllComponents(CollapseItem);
    console.log(item[0].attributes("title"));
    // expect(item[0].attributes("title")).toBe("title A");

    const headers = wrapper.findAll(".vk-collapse-item__header");
    const contents = wrapper.findAll(".vk-collapse-item__wrapper");
    // 长度
    expect(headers.length).toBe(3);
    expect(contents.length).toBe(3);
    const firstHeader = headers[0];
    const secondHeader = headers[1];
    const thirdHeader = headers[2];

    // 文本
    expect(firstHeader.text()).toBe("title A");

    // 内容
    const firstContent = contents[0];
    const secondContent = contents[1];
    const thirdContent = contents[2];
    expect(firstContent.isVisible()).toBeTruthy();
    expect(secondContent.isVisible()).toBeFalsy();
    expect(firstContent.text()).toBe("content A");

    // 行为
    await firstHeader.trigger("click");
    expect(firstContent.isVisible()).toBeFalsy();
    await secondHeader.trigger("click");
    expect(secondContent.isVisible()).toBeTruthy();
    expect(wrapper.emitted()).toHaveProperty("change");
    const changeEvent = wrapper.emitted("change") as any;
    console.table(changeEvent);
    expect(changeEvent).toHaveLength(2);
    expect(changeEvent[0]).toEqual([[]]);
    expect(changeEvent[1]).toEqual([["b"]]);
    // disabled

    expect(thirdHeader.classes()).toContain("is-disabled");
    await thirdHeader.trigger("click");
    expect(thirdContent.isVisible()).toBeFalsy();
  });
});
