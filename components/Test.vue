<script>
import {gsap} from 'gsap';

export default {
  data() {
    return {
      elements: [
        {
          id: 1,
          name: 'icon',
          position: {
            x: 28,
            y: (56 / 2) - (24 / 2)
          },
          destination: {
            x: 20,
            y: (30 / 2) - 20
          }
        },
        {
          id: 2,
          name: 'label',
          position: {
            x: 28,
            y: (56 / 2) - (24 / 2)
          },
          destination: {
            x: 12,
            y: (56 / 2) + 2
          }
        },
        {
          id: 3,
          name: 'badge',
          position: {
            x: 28,
            y: (56 / 2) - (16 / 2)
          },
          destination: {
            x: 20,
            y: 0
          }
        },
      ],
    };
  },
  methods: {
    animate() {
      this.elements.forEach((element) => {
        element.animation.restart();
      });
      setTimeout(() => {
        this.reverseAnimation();
      }, 3000)
    },
    // reverse
    reverseAnimation() {
      this.elements.forEach((element) => {
        element.animation.reverse();
      });
    },
    animateElements() {
      const trajectories = this.calculateTrajectories();
      const adjustedTrajectories = this.adjustIntersectingTrajectories(trajectories);

      this.elements.forEach((element, index) => {
        const trajectory = adjustedTrajectories[index];
        // Add animation to the element object for later reference
        element.animation = gsap.to(element.position, {
          x: trajectory[trajectory.length - 1].x,
          y: trajectory[trajectory.length - 1].y,
          duration: 2,
          ease: 'power1.inOut',
        });
      });
    },
    calculateTrajectories() {
      return this.elements.map((element) => {
        const startX = element.position.x;
        const startY = element.position.y;
        const endX = element.destination.x;
        const endY = element.destination.y;
        const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        const direction = {
          x: (endX - startX) / distance,
          y: (endY - startY) / distance,
        };
        const trajectory = [{x: startX, y: startY}];
        for (let i = 1; i < distance; i++) {
          const x = startX + direction.x * i;
          const y = startY + direction.y * i;
          trajectory.push({x, y});
        }
        trajectory.push({x: endX, y: endY});
        return trajectory;
      });
    },
    adjustIntersectingTrajectories(trajectories) {
      const adjustedTrajectories = [];

      trajectories.forEach((trajectory, index) => {
        let adjusted = false;

        for (let i = 0; i < adjustedTrajectories.length; i++) {
          const existingTrajectory = adjustedTrajectories[i];

          if (this.doTrajectoriesIntersect(trajectory, existingTrajectory)) {
            // The two trajectories intersect, so adjust the current trajectory
            adjustedTrajectories[index] = this.adjustTrajectory(trajectory, existingTrajectory);
            adjusted = true;
            break;
          }
        }

        if (!adjusted) {
          // The current trajectory does not intersect with any existing trajectories
          adjustedTrajectories[index] = trajectory;
        }
      });

      return adjustedTrajectories;
    },
    doTrajectoriesIntersect(trajectory1, trajectory2) {
      for (let i = 0; i < trajectory1.length; i++) {
        const point1 = trajectory1[i];

        for (let j = 0; j < trajectory2.length; j++) {
          const point2 = trajectory2[j];

          if (point1.x === point2.x && point1.y === point2.y) {
            return true;
          }
        }
      }

      return false;
    },
    adjustTrajectory(trajectory1, trajectory2) {
      const adjustedTrajectory = [];

      for (let i = 0; i < trajectory1.length; i++) {
        const point1 = trajectory1[i];

        for (let j = 0; j < trajectory2.length; j++) {
          const point2 = trajectory2[j];

          if (point1.x === point2.x && point1.y === point2.y) {
            // The two trajectories intersect at this point
            // Adjust the current trajectory by moving it to the right


            // Calc the angle between the two trajectories
            const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
            // Calc the distance between the two trajectories
            const distance = Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
            // Calc the new point
            const adjustedPoint = {
              x: point1.x + distance * Math.cos(angle),
              y: point1.y + distance * Math.sin(angle),
            };
            console.log('adjustedPoint', adjustedPoint)
            adjustedTrajectory.push(adjustedPoint);
          } else {
            adjustedTrajectory.push(point1);
          }
        }
      }

      return adjustedTrajectory;
    },
  },
};
</script>

<template>
  <div class="navigation-item" v-on:click="animateElements">
    <Icon :style="{position: 'absolute', top: `${elements[0].position.y}px`, left: `${elements[0].position.x}px`}"
          class="icon h-[24px] w-[24px]"
          name="ic:outline-home"/>
    <span :style="{position: 'absolute', top: `${elements[1].position.y}px`, left: `${elements[1].position.x}px`}"
          class="label text-label-large">Home</span>
    <span :style="{position: 'absolute', top: `${elements[2].position.y}px`, left: `${elements[2].position.x}px`}"
          class="badge">99+</span>
    <!--    <div v-for="(element, index) in elements" :key="index" class="box" >-->
    <!--      <div :style="{-->
    <!--        position: 'absolute',-->
    <!--        top: `${element.position.y}px`,-->
    <!--        left: `${element.position.x}px`,-->
    <!--      }"-->
    <!--      >-->
    <!--        &lt;!&ndash; Element content &ndash;&gt;-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<style lang="postcss">
.navigation-item {
  height: 58px;
  width: 356px;
  border: 1px solid var(--md-sys-color-on-outline);
  position: relative;
  border-radius: 24px;
}

.badge {
  background-color: var(--md-sys-color-error);
  color: var(--md-sys-color-on-error);
  border-radius: 12px;
  width: 34px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  padding: 4px;
  text-align: right;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.box {

}
</style>

