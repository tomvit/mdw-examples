package com.vitvar.ctu.mdw;

import java.util.Hashtable;

import javax.jms.*;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class JMSClient {

	// Defines the JNDI context factory.
	public final static String JNDI_FACTORY = "weblogic.jndi.WLInitialContextFactory";

	// Defines the JMS context factory.
	public final static String JMS_FACTORY = "jms/mdw-connection-factory";

	// Defines the queue.
	public final static String QUEUE = "jms/mdw-dist-queue";

	// URL
	public final static String PROVIDER_URL = "t3://czfmwapp03-vf:8001";

	private QueueConnectionFactory qconFactory;
	private QueueConnection qcon;
	private QueueSession qsession;
	private QueueSender qsender;
	private QueueReceiver qreceiver;
	private Queue queue;
	private TextMessage msg;

	public void init(Context ctx, String queueName, boolean sender)
			throws NamingException, JMSException {

		qconFactory = (QueueConnectionFactory) ctx.lookup(JMS_FACTORY);
		qcon = qconFactory.createQueueConnection();
		qsession = qcon.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
		queue = (Queue) ctx.lookup(queueName);

		if (sender) {
			qsender = qsession.createSender(queue);
			msg = qsession.createTextMessage();			
		} else {
			qreceiver = qsession.createReceiver(queue);
			/*qreceiver.setMessageListener(
				new MessageListener() {	
					public void onMessage(Message msg) {
						try {
							String msgText;
							if (msg instanceof TextMessage) {
								msgText = ((TextMessage) msg).getText();
							} else {
								msgText = msg.toString();
							}
							System.out.println("Message Received: " + msgText);
						} catch (JMSException jmse) {
							System.err.println("An exception occurred: " + jmse.getMessage());
						}
					}
				}
			);*/
		}

		qcon.start();
	}

	public void close() throws JMSException {
		if (qsender != null) 
			qsender.close();
		else
			qreceiver.close();
		qsession.close();
		qcon.close();
	}

	public void send(String message) throws Exception {
		Hashtable<String, String> env = new Hashtable<String, String>();
		env.put(Context.INITIAL_CONTEXT_FACTORY, JNDI_FACTORY);
		env.put(Context.PROVIDER_URL, PROVIDER_URL);

		InitialContext ic = new InitialContext(env);

		init(ic, QUEUE, true);
		try {
			msg.setText(message);
			System.out.println("Destination: " + qsender.getDestination().toString());
			qsender.send(msg, DeliveryMode.PERSISTENT, 8, 0);
		} finally {
			close();
		}
	}
	
	public void receive() throws Exception {
		Hashtable<String, String> env = new Hashtable<String, String>();
		env.put(Context.INITIAL_CONTEXT_FACTORY, JNDI_FACTORY);
		env.put(Context.PROVIDER_URL, PROVIDER_URL);

		InitialContext ic = new InitialContext(env);

		init(ic, QUEUE, false);
		try {
			Message msg = qreceiver.receiveNoWait();
			System.out.println("Queue name: " + qreceiver.getQueue().getQueueName() + ", " + qcon.getMetaData().toString());
			while (msg != null) {
				if (msg instanceof TextMessage)
					System.out.println(((TextMessage)msg).getText());
				else
					System.out.println(msg.toString());
				msg = qreceiver.receiveNoWait();				
			}
		} finally {
			close();
		}
		System.out.println("done!");
	}

	public static void main(String[] args) throws Exception {
		JMSClient client = new JMSClient();
		
		client.send("High priority --- aaaahoj, tohle je test JMS!");
		
		//client.receive();

	}

}
