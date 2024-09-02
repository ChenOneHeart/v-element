import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils"
import Button from "./Button.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Icon from '../Icon/Icon.vue'

describe("Button.vue", () => {
  // 测试按钮基本功能
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
      },
      slots: {
        default: 'button'
      }
    })
    console.log(wrapper.html());
    expect(wrapper.classes()).toContain('vc-button--primary')
    // slot
    expect(wrapper.get('button').text()).toBe('button')
    wrapper.get("button").trigger('click')
    console.log(wrapper.emitted())
    // toHaveProperty测试对象是否有某个属性
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  test('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'disabled'
      }
    })
    // toBeDefined检查属性是否存在
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeDefined()
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
  // 测试按钮上的图标
  test("icon", () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        // stubs用来替换自定义组件或指令的实现
        stubs: ['FontAwesomeIcon']
      }
    })
    console.log(wrapper.html());
    // 测试是否存在FontAwesomeIcon组件
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    // 测试icon属性是否是传入的arrow-up参数
    expect(iconElement.attributes('icon')).toEqual('arrow-up')
  })
  // 测试按钮上的图标加载状态
  test("icon", () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log(wrapper.html());
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe("spinner")
    expect(wrapper.attributes("disabled")).toBeDefined()
  })
})