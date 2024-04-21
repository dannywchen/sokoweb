import React, {
  useState,
  useEffect,
  Suspense,
  useCallback,
  useRef,
} from "react";
import styled from "styled-components";

const PromiseThrower = () => {
  throw new Promise(() => {});
};

const FallbackDelayer = ({
  fallback,
  fallbackDelayMs = void 0,
  onShowFallback,
}) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (fallbackDelayMs) {
      const timeoutId = setTimeout(() => {
        setShowFallback(true);
        onShowFallback();
      }, fallbackDelayMs);
      return () => {
        clearInterval(timeoutId);
      };
    } else {
      setShowFallback(true);
      onShowFallback();
    }
  }, [fallbackDelayMs, onShowFallback]);

  return showFallback ? fallback : null;
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  font-weight: bold;
`;

const FakeLoader = ({
  children,
  fallback,
  fallbackDelayMs = 0,
  fallbackMinDurationMs = 0,
  onLoaded,
}) => {
  const [isWaitingFallbackMinDurationMs, setIsWaitingFallbackMinDurationMs] =
    useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const timeoutIdRef = useRef(undefined);

  const startWaitingFallbackMinDurationMs = useCallback(() => {
    setIsWaitingFallbackMinDurationMs(true);
    timeoutIdRef.current && clearInterval(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      setIsWaitingFallbackMinDurationMs(false);
      onLoaded && onLoaded();
    }, fallbackMinDurationMs);
  }, [fallbackMinDurationMs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prevPercentage) => {
        const newPercentage = prevPercentage + 1;
        if (newPercentage === 100) {
          clearInterval(interval);
        }
        return newPercentage;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      timeoutIdRef.current && clearInterval(timeoutIdRef.current);
    };
  }, []);

  return (
    <Suspense
      fallback={
        <FallbackDelayer
          fallback={<LoadingContainer>{loadingPercentage}%</LoadingContainer>}
          fallbackDelayMs={fallbackDelayMs}
          onShowFallback={startWaitingFallbackMinDurationMs}
        />
      }
    >
      {isWaitingFallbackMinDurationMs && <PromiseThrower />}
      {children}
    </Suspense>
  );
};

export default FakeLoader;
