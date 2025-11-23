import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

import './index.scss';

type Props = {
  width: number;
  height: number;
};

export default function Clock(props: Props) {
  const darkMode = useAppSelector(s => s.ui.darkMode);

  const [dpr] = useState<number>(window.devicePixelRatio || 1);
  const [date, setDate] = useState<Date>(new Date());

  const dialPlateRef = useRef<HTMLCanvasElement>(null);
  const dialPlateCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const handsRef = useRef<HTMLCanvasElement>(null);
  const handsCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const dialPlateCtx = dialPlateRef.current?.getContext('2d');
    const handsCtx = handsRef.current?.getContext('2d');

    if (dialPlateCtx && handsCtx) {
      dialPlateCtxRef.current = dialPlateCtx;
      handsCtxRef.current = handsCtx;

      initCanvas();
    }

    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    drawDialPlate();
    drawHands();
  }, [darkMode]);

  useEffect(() => {
    drawHands();
  }, [date]);

  const initCanvas = () => {
    const { width, height } = props;

    if (dialPlateRef.current) {
      dialPlateRef.current.width = width * dpr;
      dialPlateRef.current.height = height * dpr;
      dialPlateRef.current.style.width = `${width}px`;
      dialPlateRef.current.style.height = `${height}px`;

      dialPlateCtxRef.current?.scale(dpr, dpr);
    }

    if (handsRef.current) {
      handsRef.current.width = width * dpr;
      handsRef.current.height = height * dpr;
      handsRef.current.style.width = `${width}px`;
      handsRef.current.style.height = `${height}px`;

      handsCtxRef.current?.scale(dpr, dpr);
    }
  };

  const drawDialPlate = () => {
    if (dialPlateRef.current && dialPlateCtxRef.current) {
      const { width, height } = props;
      const color = !darkMode ? '#fafafa' : '#051239dd';
      const center = [width / 2, height / 2];
      const radius = Math.ceil(0.85 * Math.min(center[0], center[1]));

      const ctx = dialPlateCtxRef.current;

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(center[0], center[1], radius, 0, Math.PI * 2);
      ctx.fill();

      const baseTickLength = 7;
      const baseTickWidth = 1;
      const majorTickLength = 10;
      const majorTickWidth = 2;

      for (let i = 0; i < 60; i++) {
        let tickLength = i % 5 === 0 ? majorTickLength : baseTickLength;

        const angle = (i * Math.PI * 2) / 60;
        const xStart = center[0] + Math.cos(angle) * (radius - tickLength);
        const yStart = center[1] + Math.sin(angle) * (radius - tickLength);
        const xEnd = center[0] + Math.cos(angle) * radius * 0.95;
        const yEnd = center[1] + Math.sin(angle) * radius * 0.95;

        let tickWidth = i % 5 === 0 ? majorTickWidth : baseTickWidth;
        let tickColor =
          i % 5 === 0 ? (!darkMode ? '#001447aa' : '#ffffffcc') : !darkMode ? '#b0b0b0' : '#cccccc';

        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineWidth = tickWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = tickColor;
        ctx.stroke();
      }

      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 3;
      ctx.shadowBlur = 5;
      ctx.shadowColor = !darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)';

      ctx.beginPath();
      ctx.fillStyle = darkMode ? '#fafafa' : '#051239dd';
      ctx.arc(center[0], center[1], 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawHands = () => {
    if (handsRef.current && handsCtxRef.current) {
      const { width, height } = props;
      const ctx = handsCtxRef.current;
      const center = [width / 2, height / 2];
      const radius = Math.ceil(0.85 * Math.min(center[0], center[1]));

      const hours = date.getHours() % 12;
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      ctx.clearRect(0, 0, width * dpr, height * dpr);

      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      ctx.shadowBlur = 5;
      ctx.shadowColor = !darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)';

      const drawHourHand = () => {
        const hourAngle = Math.PI * 2 * (hours / 12) + (Math.PI * 2 * (minutes / 60)) / 12;
        const hourHandColor = !darkMode ? '#001447cc' : '#ffffffcc';
        const hourHandLength = radius * 0.45;
        const hourHandWidth = 5;

        const xEnd = center[0] + Math.cos(hourAngle - Math.PI / 2) * hourHandLength;
        const yEnd = center[1] + Math.sin(hourAngle - Math.PI / 2) * hourHandLength;

        ctx.beginPath();
        ctx.moveTo(center[0], center[1]);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineWidth = hourHandWidth;
        ctx.strokeStyle = hourHandColor;
        ctx.lineCap = 'round';
        ctx.stroke();
      };

      const drawMinuteHand = () => {
        const minuteAngle = Math.PI * 2 * (minutes / 60);
        const minuteHandColor = !darkMode ? '#001447cc' : '#ffffffcc';
        const minuteHandLength = radius * 0.7;
        const minuteHandWidth = 4;

        const xEnd = center[0] + Math.cos(minuteAngle - Math.PI / 2) * minuteHandLength;
        const yEnd = center[1] + Math.sin(minuteAngle - Math.PI / 2) * minuteHandLength;

        ctx.beginPath();
        ctx.moveTo(center[0], center[1]);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineWidth = minuteHandWidth;
        ctx.strokeStyle = minuteHandColor;
        ctx.lineCap = 'round';
        ctx.stroke();
      };

      const drawSecondHand = () => {
        const secondAngle = Math.PI * 2 * (seconds / 60);
        const secondHandColor = !darkMode ? '#67abffaa' : '#7272f3aa';
        const secondHandLength = radius * 0.8;
        const secondHandWidth = 2;

        const xEnd = center[0] + Math.cos(secondAngle - Math.PI / 2) * secondHandLength;
        const yEnd = center[1] + Math.sin(secondAngle - Math.PI / 2) * secondHandLength;

        ctx.beginPath();
        ctx.moveTo(center[0], center[1]);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineWidth = secondHandWidth;
        ctx.strokeStyle = secondHandColor;
        ctx.lineCap = 'round';
        ctx.stroke();
      };

      drawHourHand();
      drawMinuteHand();
      drawSecondHand();
    }
  };

  return (
    <div
      className="clock-container"
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      <canvas id="dial-plate" ref={dialPlateRef} />
      <canvas id="hands" ref={handsRef} />
    </div>
  );
}
