import React, { useState, forwardRef, useEffect, useRef } from "react";
import { InputWithLabel } from "../../shared/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfile } from "../../features/editProfile/editProfile";
import { Button } from "../../shared/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

interface EditModalProps {
  closeModal: () => void;
  initialName: string;
  initialEmail: string;
}

export const EditModal = forwardRef<HTMLDivElement, EditModalProps>(
  ({ closeModal, initialName, initialEmail }) => {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null); // Создаем ссылку на модальное окно

    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const mutation = useMutation(editProfile, {
      onSuccess: () => {
        if (email !== initialEmail) {
          dispatch(logout());
        } else {
          queryClient.invalidateQueries(["profile"]);
        }
        handleCloseModal();
      },
      onError: (error) => {
        console.error("Ошибка редактирования профиля:", error);
      },
    });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };

    const handleSaveClick = () => {
      mutation.mutate({ name, email });
    };

    const handleCloseModal = () => {
      setIsVisible(false);
      setTimeout(closeModal, 300);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        handleSaveClick(); // Сохраняем данные
      } else if (e.key === "Escape") {
        handleCloseModal(); // Закрываем модал при нажатии Esc
      }
    };

    useEffect(() => {
      setIsVisible(true);
    }, []);

    useEffect(() => {
      // Фокусируемся на модальном окне, когда оно открыто
      if (isVisible && modalRef.current) {
        modalRef.current.focus(); // Устанавливаем фокус на модальное окно
      }
    }, [isVisible]);

    return (
      <div
        className={`fixed inset-0 bg-black/50 flex justify-center items-center transition-opacity duration-200 ease-linear ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          ref={modalRef} // Присоединяем ссылку к модальному окну
          onKeyDown={handleKeyDown}
          tabIndex={0} // Обеспечиваем возможность фокуса
          className={`flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg h-[80vh] w-[90vw] md:w-[450px] md:h-[450px] transition-transform duration-300 ${
            isVisible ? "scale-100" : "scale-95"
          }`}
        >
          <h2 className="text-lg font-bold mb-4">Редактировать профиль</h2>

          <InputWithLabel
            initialLabel="Имя"
            value={name}
            onChange={handleNameChange}
          />

          <InputWithLabel
            initialLabel="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />

          <div className="mt-6 flex justify-end gap-3">
            <Button onClick={handleCloseModal} theme="grey">
              Отмена
            </Button>
            <Button onClick={handleSaveClick} disabled={mutation.isLoading}>
              {mutation.isLoading ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>

          {mutation.isError && (
            <p className="text-red-500 mt-2">Ошибка при сохранении данных.</p>
          )}
        </div>
      </div>
    );
  }
);

export default EditModal;
