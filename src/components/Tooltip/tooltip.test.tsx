import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Tooltip from "./Tooltip.vue";
vi.mock("@popperjs/core");
const onVisibleChange = vi.fn();

describe("Tooltip.vue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  }),
    test("测试组件基本功能", async () => {
      const wrapper = mount(
        () => (
          <div>
            <div id="outside"></div>
            <Tooltip
              trigger="click"
              content="hello tooltip"
              onVisible-change={onVisibleChange}
            >
              <button id="trigger"></button>
            </Tooltip>
          </div>
        ),
        {
          attachTo: document.body,
        }
        // 静态测试
      );
      const triggerArea = wrapper.find("#trigger");
      expect(triggerArea.exists()).toBeTruthy();
      expect(wrapper.find(".vk-tooltip__popper").exists()).toBeFalsy();
      triggerArea.trigger("click");
      await vi.runAllTimers();
      expect(wrapper.find(".vk-tooltip__popper").exists()).toBeTruthy();
      expect(onVisibleChange).toHaveBeenCalledTimes(1);
      expect(onVisibleChange).toHaveBeenCalledWith(true);
      triggerArea.trigger("click");
      // await vi.runAllTimers();
      // expect(wrapper.find(".vk-tooltip__popper").exists()).toBeFalsy();
      // expect(onVisibleChange).toHaveBeenCalledTimes(2);
      // expect(onVisibleChange).toHaveBeenCalledWith(false);
      const outerArea = wrapper.find("#outside");
      outerArea.trigger("click");
      await vi.runAllTimers();
      expect(wrapper.find(".vk-tooltip__popper").exists()).toBeFalsy();
      expect(onVisibleChange).toHaveBeenCalled();
      
    });
});
