import { mount } from "@vue/test-utils";
import { describe, expect, it, test } from "vitest";
import Input from "./Input.vue";
import exp from "constants";
import { nextTick } from "vue";

describe("Input.vue", () => {
  test("基本展示", () => {
    // 动态class
    // v-if
    // slots
    const wrapper = mount(Input, {
      props: {
        type: "text",
        size: "small",
        modelValue: ""
      },
      slots: {
        prepend: "prepend text",
        prefix: 'prefix text',
        append: "append text",
        suffix: "suffix text"
      }
    })
    console.log(wrapper.html());
    expect(wrapper.classes()).toContain("vc-input--text")
    expect(wrapper.classes()).toContain("vc-input--small")
    // should render input
    expect(wrapper.find("input").exists()).toBeTruthy();
    expect(wrapper.get("input").attributes("type")).toBe("text")
    // slots
    expect(wrapper.find(".vc-input__prefix").exists()).toBeTruthy();
    expect(wrapper.find(".vc-input__prefix").text()).toBe("prefix text");
    expect(wrapper.find(".vc-input__prepend").exists()).toBeTruthy();
    expect(wrapper.find(".vc-input__prepend").text()).toBe("prepend text");
    expect(wrapper.find(".vc-input__append").exists()).toBeTruthy();
    expect(wrapper.find(".vc-input__append").text()).toBe("append text");
    expect(wrapper.find(".vc-input__suffix").exists()).toBeTruthy();
    expect(wrapper.find(".vc-input__prepend").text()).toBe("prepend text");
    // textarea
    const wrapper2 = mount(Input, {
      props: {
        type: "textarea",
        size: "small",
        modelValue: ""
      },
    })
    expect(wrapper2.find("textarea").exists()).toBeTruthy()
  })
  test.only("支持v-model", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "test",
        "onUpdate:modelValue": (e: any) => wrapper.setProps({ modelValue: e })
      }
    })
    // 初始值
    console.log(wrapper.html());
    const input = wrapper.get('input')
    expect(input.element.value).toBe("test")
    // 更新值
    await input.setValue("update")
    expect(wrapper.props("modelValue")).toBe("update");
    console.log('the events', wrapper.emitted());
    expect(wrapper.emitted()).toHaveProperty("input");
    expect(wrapper.emitted()).toHaveProperty("change");
    const inputEvent = wrapper.emitted("input");
    const changeEvent = wrapper.emitted("change");
    console.log(changeEvent![0]);
    expect(inputEvent![0]).toEqual(["update"]);
    expect(changeEvent![0]).toEqual(["update"]);
    // v-model的异步更新
    await wrapper.setProps({ modelValue: "prop update" });
    expect(input.element.value).toBe("prop update")
  })
  test("支持点击清空字符串", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "123",
        clearable: true,
      },
      global: {
        stubs: ["Icon"]
      }
    })
    // 默认不出现clear图标
    expect(wrapper.find(".vc-input__clear").exists()).toBeFalsy();
    const input = wrapper.get('input')
    // 触发事件后出现图标
    await input.trigger("focus");
    expect(wrapper.emitted()).toHaveProperty("focus");
    expect(wrapper.find(".vc-input__clear").exists()).toBeTruthy();
    // 触发清空事件后删除文本内容
    await wrapper.get(".vc-input__clear").trigger("click");
    expect(input.element.value).toBe("");
    expect(wrapper.emitted()).toHaveProperty("clear");
    expect(wrapper.emitted()).toHaveProperty("change");
    expect(wrapper.emitted()).toHaveProperty("input");
    const inputEvent = wrapper.emitted("input");
    const changeEvent = wrapper.emitted("change");
    expect(inputEvent![0]).toEqual(['']);
    expect(changeEvent![0]).toEqual(['']);

    await input.trigger("blur");
    expect(wrapper.emitted()).toHaveProperty("focus")
  })
  it("支持切换密码显示", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "",
        showPassword: true,
        type: "text"
      },
      global: {
        stubs: ["Icon"]
      }
    })
    // 不出现对应的Icon区域，因为当前值为空
    expect(wrapper.find(".vc-input__password").exists()).toBeFalsy();
    const input = wrapper.get("input")
    expect(input.element.type).toBe("password")
    // 出现Icon区域，并且Icon为特定的图标
    await input.setValue("123");
    const eyeIcon = wrapper.find(".vc-input__password")
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes("icon")).toBe("eye-slash")
    await eyeIcon.trigger("click");
    expect(input.element.type).toBe("text");
    expect(wrapper.find(".vc-input__password").attributes("icon")).toBe("eye");
  })

})
