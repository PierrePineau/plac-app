import { Bell, Settings } from "lucide-react";
import SearchBar from "./searchBar";
import Popup from "./popup";
import { useEffect, useState } from "react";
import { useNotificationStore } from "@/store/user/notificationStore";
import Tabs from "./tabs";

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const { notifications, fetchNotifications } = useNotificationStore();

  // useEffect(() => {
  //   fetchNotifications();
  // }, [fetchNotifications]);

  const handleOpenNotif = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // const tabs = [
  //   {
  //     label: "Tout",
  //     content: <NotificationBody notifications={notifications} />,
  //     unreadCount: notifications.filter((notif) => !notif.read).length
  //   },
  //   {
  //     label: "Archivé",
  //     content: (
  //       <NotificationBody
  //         notifications={notifications.filter((notif) => notif.read)}
  //       />
  //     )
  //   }
  // ];

  return (
    <div className="justify-start bg-white px-8 py-5">
      <div className="flex flex-row justify-between items-center">
        <div className="w-searchBarWidth">
          <SearchBar
            placeholder="Rechercher"
            onChange={function (query: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <button onClick={handleOpenNotif}>
            <Bell className="text-black" />
          </button>
          <img
            className="w-auto h-8"
            src="/asset/img/avatar.svg"
            alt="Logo Plac"
          />
          <div className="flex flex-col items-start">
            <p className="text-paragraphBold text-neutral-900">Jean Martin</p>
            <p className="text-tag text-neutral-400">jeanmartin@gmail.com</p>
          </div>
        </div>
      </div>

      {/* <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Notification">
        <div className="flex flex-col gap-4">
          <Tabs tabs={tabs} />
          <div className="text-start flex flex-row gap-2">
            <Settings className="text-neutral-400" />
            <button className="text-brand-500 font-satoshi text-paragraphRegular">
              Tout marquer comme lu
            </button>
          </div>
        </div>
      </Popup> */}
    </div>
  );
}

const NotificationBody: React.FC<{ notifications: Notif[] }> = ({
  notifications
}) => {
  return (
    <div className="max-h-64 overflow-y-auto">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

const NotificationItem: React.FC<{ notification: Notif }> = ({
  notification
}) => {
  const { sender, message, createdAt, read } = notification;

  return (
    <div className="flex items-start space-x-4 p-4">
      <img
        className="w-auto h-8 rounded-full"
        src="/asset/img/avatar.svg"
        alt="Avatar"
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-1">
            <p className="font-satoshi text-paragraphBold text-neutral-950">
              {sender.firstname} {sender.lastname}
            </p>
            <p className="text-neutral-400 font-satoshi text-paragraphRegular">
              a écrit
            </p>
          </div>
          {!read && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
        </div>
        <div className=" font-satoshi text-paragraphRegular text-neutral-500 border border-neutral-200 p-2 rounded-lg">
          {message}
        </div>
        <div className=" font-satoshi text-sm text-neutral-400">
          {createdAt.toLocaleString()}
        </div>
      </div>
    </div>
  );
};
